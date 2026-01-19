'use client';
import { useState } from 'react';
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Button,
    Grid,
    Paper,
    Typography,
    Box,
    Checkbox,
    Alert,
    CircularProgress
} from "@mui/material";
import { 
    TotalDeliveriesCard, 
    SlaComplianceCard, 
    AvgDeliveryTimeCard, 
    ActiveHubsCard 
} from "./widgets/KpiCards";
import { DashboardWidgetId } from "./widgets/widgetIds";
import { useAuth } from "@/app/ui/providers/AuthProvider";

interface AddKpiWidgetModalProps {
    open: boolean;
    onClose: () => void;
    dashboardId: number;
    onSuccess: () => void;
    currentWidgets?: any[];
}


const AVAILABLE_WIDGETS = [
    { id: DashboardWidgetId.TOTAL_DELIVERIES, Component: TotalDeliveriesCard, label: "Total Deliveries" },
    { id: DashboardWidgetId.SLA_COMPLIANCE, Component: SlaComplianceCard, label: "SLA Compliance" },
    { id: DashboardWidgetId.AVG_DELIVERY_TIME, Component: AvgDeliveryTimeCard, label: "Avg Delivery Time" },
    { id: DashboardWidgetId.ACTIVE_HUBS, Component: ActiveHubsCard, label: "Active Hubs" },
];

export const AddKpiWidgetModal = ({ open, onClose, dashboardId, onSuccess, currentWidgets = [] }: AddKpiWidgetModalProps) => {
    const { token } = useAuth();
    const [selectedWidgets, setSelectedWidgets] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Initialize state when modal opens
    useState(() => {
        if (open) {
            // Sort by position if available in currentWidgets, otherwise rely on array order
            // We assume one widget per definition ID for now based on UI
            const initialSelection = currentWidgets
                .sort((a, b) => (a.position - b.position))
                .map(w => w.queryConfig?.widgetDefinitionId)
                .filter(id => id !== undefined);
            
            setSelectedWidgets(initialSelection);
        }
    });

    // Also update when open prop changes
    const [prevOpen, setPrevOpen] = useState(false);
    if (open !== prevOpen) {
        setPrevOpen(open);
        if (open) {
            const initialSelection = currentWidgets
                .sort((a, b) => (a.position - b.position))
                .map(w => w.queryConfig?.widgetDefinitionId)
                .filter(id => id !== undefined);
            setSelectedWidgets(initialSelection);
        }
    }

    const handleToggle = (id: number) => {
        if (selectedWidgets.includes(id)) {
            setSelectedWidgets(prev => prev.filter(wId => wId !== id));  // Remove from selection
        } else {
            if (selectedWidgets.length >= 4) return;
            setSelectedWidgets(prev => [...prev, id]); // Add to end of selection
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            // 1. Identify widgets to delete (in currentWidgets but not in selectedWidgets)
             const widgetsToDelete = currentWidgets.filter(w => 
                !selectedWidgets.includes(w.queryConfig?.widgetDefinitionId)
            );

            // 2. Identify widgets to create (in selectedWidgets but not in currentWidgets)
             // Actually, to support reordering, and simplicity, and since we don't have a huge number of widgets:
             // We could delete deleted ones, and update positions of existing ones. But simpler might be to upsert or just manage list.
             // Given the constraints and likely low volume, let's do:
             // - DELETE widgets no longer selected.
             // - CREATE widgets newly selected.
             // - UPDATE positions of kept widgets to match new order.
             
             // However, `selectedWidgets` is just an array of definition IDs. The diff logic:
             
             // Helper to find existing widget by definition ID
             const findExisting = (defId: number) => currentWidgets.find(w => w.queryConfig?.widgetDefinitionId === defId);

            // Delete removed widgets
            for (const w of widgetsToDelete) {
                await fetch(`/api/dashboard-widget?id=${w.id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            }

            // Upsert / Update positions
            for (let i = 0; i < selectedWidgets.length; i++) {
                const defId = selectedWidgets[i];
                const existing = findExisting(defId);

                if (existing) {
                    // Update position if changed
                    if (existing.position !== i) {
                        await fetch('/api/dashboard-widget', {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                             body: JSON.stringify({
                                 id: existing.id,
                                 position: i
                             })
                        });
                    }
                } else {
                    // Create new
                     await fetch('/api/dashboard-widget', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            dashboardId,
                            type: 'kpi',
                            queryConfig: { widgetDefinitionId: defId },
                            visualConfig: {},
                            position: i
                        })
                    });
                }
            }
            
            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            setError('Failed to update widgets. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Add KPI Widgets</DialogTitle>
            <DialogContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Select up to 4 widgets to display on your dashboard.
                </Typography>
                
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <Grid container spacing={2}>
                    {AVAILABLE_WIDGETS.map((widget) => {
                        const isSelected = selectedWidgets.includes(widget.id);
                        return (
                            <Grid size={{ xs: 12, sm: 6 }} key={widget.id}>

                                <Paper 
                                    sx={{ 
                                        p: 2, 
                                        border: '2px solid',
                                        borderColor: isSelected ? 'primary.main' : 'transparent',
                                        cursor: 'pointer',
                                        position: 'relative',
                                        '&:hover': {
                                            bgcolor: 'action.hover'
                                        }
                                    }}
                                    onClick={() => handleToggle(widget.id)}
                                >
                                    <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                                        <Checkbox 
                                            checked={isSelected}
                                            disabled={!isSelected && selectedWidgets.length >= 4}
                                        />
                                    </Box>
                                    <Box sx={{ pointerEvents: 'none', opacity: isSelected ? 1 : 0.7 }}>
                                        <widget.Component />
                                    </Box>
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button 
                    onClick={handleSubmit} 
                    variant="contained" 
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : 'Save'}
                </Button>

            </DialogActions>
        </Dialog>
    );
};

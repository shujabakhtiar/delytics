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
}

const AVAILABLE_WIDGETS = [
    { id: DashboardWidgetId.TOTAL_DELIVERIES, Component: TotalDeliveriesCard, label: "Total Deliveries" },
    { id: DashboardWidgetId.SLA_COMPLIANCE, Component: SlaComplianceCard, label: "SLA Compliance" },
    { id: DashboardWidgetId.AVG_DELIVERY_TIME, Component: AvgDeliveryTimeCard, label: "Avg Delivery Time" },
    { id: DashboardWidgetId.ACTIVE_HUBS, Component: ActiveHubsCard, label: "Active Hubs" },
];

export const AddKpiWidgetModal = ({ open, onClose, dashboardId, onSuccess }: AddKpiWidgetModalProps) => {
    const { token } = useAuth();
    const [selectedWidgets, setSelectedWidgets] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleToggle = (id: number) => {
        if (selectedWidgets.includes(id)) {
            setSelectedWidgets(prev => prev.filter(wId => wId !== id));
        } else {
            if (selectedWidgets.length >= 4) return;
            setSelectedWidgets(prev => [...prev, id]);
        }
    };

    const handleSubmit = async () => {
        if (selectedWidgets.length === 0) return;
        
        setLoading(true);
        setError(null);

        try {
            // Create widgets sequentially to maintain order
            for (let i = 0; i < selectedWidgets.length; i++) {
                const widgetId = selectedWidgets[i];
                
                // Here we are creating a new DashboardWidget entry.
                // It seems the USER wants to store the 'type' as the key to which component to render.
                // But previously we talked about 'known int id'. 
                // In the DetailContainer, I assumed `widget.id` mapped to the component, but `widget.id` is the DB primary key.
                // So I need to store the "Widget Definition ID" (like TOTAL_DELIVERIES=1) somewhere. 
                // The schema has `type`, `queryConfig`, `visualConfig`. 
                // I will store the definition ID in `type` as a string for now, or `visualConfig`.
                // The prompt says: "use the type to render that Kpi Card".
                // So I will store the ID (e.g. "1", "2") in the `type` field.
                
                const res = await fetch('/api/dashboard-widget', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        dashboardId,
                        type: 'kpi', // The user request says "use the type to render". But also "type must be kpi". 
                                     // Clarification: "dashboard-widget key and type must be kpi".
                                     // Let's store 'kpi' as type, and put the specific widget ID in queryConfig or visualConfig.
                                     // Wait, Looking at detail container: `const WidgetComponent = WIDGET_COMPONENT_MAP[widget.id];`
                                     // That logic was flawed because widget.id is auto-increment.
                                     // I will fix DetailContainer to look at `visualConfig.widgetId` or similar.
                                     // For now, let's store it in `queryConfig` as `widgetDefinitionId`.
                                     
                        queryConfig: { widgetDefinitionId: widgetId }, 
                        visualConfig: {},
                        position: i
                    })
                });

                if (!res.ok) {
                    throw new Error('Failed to create widget');
                }
            }
            
            onSuccess();
            onClose();
            setSelectedWidgets([]);
        } catch (err) {
            console.error(err);
            setError('Failed to add widgets. Please try again.');
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
                    disabled={selectedWidgets.length === 0 || loading}
                >
                    {loading ? <CircularProgress size={24} /> : `Add ${selectedWidgets.length} Widget(s)`}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

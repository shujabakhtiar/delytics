import React, { useState, useEffect } from 'react';
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
    Radio
} from "@mui/material";
import { 
    RegionSlaChart,
    DeliveryStatusChart,
    FleetUtilizationChart
} from "./widgets/Charts";
import { DashboardWidgetId } from "./widgets/widgetIds";

interface AddSideChartProps {
    open: boolean;
    onClose: () => void;
    onSelect: (chartId: DashboardWidgetId) => void;
    currentChartId: DashboardWidgetId | null;
}

const AVAILABLE_CHARTS = [
    { id: DashboardWidgetId.REGION_SLA, Component: RegionSlaChart, label: "Region vs SLA" },
    { id: DashboardWidgetId.DELIVERY_STATUS, Component: DeliveryStatusChart, label: "Delivery Status" },
    { id: DashboardWidgetId.FLEET_UTILIZATION, Component: FleetUtilizationChart, label: "Fleet Utilization" },
];

export const AddSideChart = ({ open, onClose, onSelect, currentChartId }: AddSideChartProps) => {
    const [selectedId, setSelectedId] = useState<DashboardWidgetId | null>(currentChartId);

    // Update internal state when prop changes or modal opens
    useEffect(() => {
        if (open) {
            setSelectedId(currentChartId);
        }
    }, [open, currentChartId]);

    const handleSave = () => {
        if (selectedId) {
            onSelect(selectedId);
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Select Side Chart</DialogTitle>
            <DialogContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Choose a chart to display in this section.
                </Typography>
                
                <Grid container spacing={2}>
                    {AVAILABLE_CHARTS.map((chart) => {
                        const isSelected = selectedId === chart.id;
                        return (
                            <Grid size={{ xs: 12, md: 6 }} key={chart.id}>
                                <Paper 
                                    sx={{ 
                                        p: 2, 
                                        border: '2px solid',
                                        borderColor: isSelected ? 'primary.main' : 'transparent',
                                        cursor: 'pointer',
                                        position: 'relative',
                                        '&:hover': {
                                            bgcolor: 'action.hover'
                                        },
                                        height: '100%',
                                        overflow: 'hidden'
                                    }}
                                    onClick={() => setSelectedId(chart.id)}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <Radio 
                                            checked={isSelected}
                                            value={chart.id}
                                            onChange={() => setSelectedId(chart.id)}
                                        />
                                        <Typography variant="subtitle1" fontWeight={600}>
                                            {chart.label}
                                        </Typography>
                                    </Box>
                                    
                                    {/* Preview Container - Scaled down */}
                                    <Box sx={{ 
                                        pointerEvents: 'none', 
                                        opacity: isSelected ? 1 : 0.7,
                                        height: '200px', 
                                        overflow: 'hidden',
                                        position: 'relative'
                                    }}>
                                        <Box sx={{ transform: 'scale(0.6)', transformOrigin: 'top left', width: '166%', height: '166%' }}>
                                            <chart.Component />
                                        </Box>
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
                    onClick={handleSave} 
                    variant="contained" 
                    disabled={!selectedId}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

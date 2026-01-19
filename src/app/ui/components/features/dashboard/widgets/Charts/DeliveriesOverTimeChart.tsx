import { Box, Typography, Paper, Stack, Link as MuiLink, Divider } from "@mui/material";
import { DashboardWidgetId } from "../widgetIds";

export const WIDGET_ID_DELIVERIES_OVER_TIME = DashboardWidgetId.DELIVERIES_OVER_TIME;

export const DeliveriesOverTimeChart = () => {
    return (
        <Paper sx={{ p: 3, height: '400px', display: 'flex', flexDirection: 'column' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h6">Deliveries Over Time</Typography>
                <MuiLink href="#" sx={{ fontSize: '0.875rem', fontWeight: 600 }}>View Details</MuiLink>
            </Stack>
            <Box sx={{ 
                flex: 1, 
                bgcolor: 'rgba(59, 130, 246, 0.05)', 
                borderRadius: 2, 
                border: '1px dashed',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <Typography color="text.secondary">Line Chart Visualization Placeholder</Typography>
                {/* Decorative Grid Lines */}
                <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.1, pointerEvents: 'none' }}>
                    {[...Array(8)].map((_, i) => (
                        <Divider key={i} sx={{ position: 'absolute', top: `${(i+1)*12.5}%`, width: '100%' }} />
                    ))}
                </Box>
            </Box>
        </Paper>
    );
};

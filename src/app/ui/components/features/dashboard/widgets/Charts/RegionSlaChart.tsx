import { Box, Typography, Paper, Stack } from "@mui/material";
import { DashboardWidgetId } from "../widgetIds";

export const WIDGET_ID_REGION_SLA = DashboardWidgetId.REGION_SLA;

export const RegionSlaChart = () => {
    return (
        <Paper sx={{ p: 3, height: '400px', display: 'flex', flexDirection: 'column' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h6">Region vs SLA</Typography>
            </Stack>
            <Box sx={{ 
                flex: 1, 
                bgcolor: 'rgba(16, 185, 129, 0.05)', 
                borderRadius: 2, 
                border: '1px dashed',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-around',
                p: 2
            }}>
                {[60, 80, 40, 95, 70].map((h, i) => (
                    <Box key={i} sx={{ 
                        width: '15%', 
                        height: `${h}%`, 
                        bgcolor: 'primary.main', 
                        borderRadius: '4px 4px 0 0',
                        opacity: 0.7 
                    }} />
                ))}
            </Box>
        </Paper>
    );
};

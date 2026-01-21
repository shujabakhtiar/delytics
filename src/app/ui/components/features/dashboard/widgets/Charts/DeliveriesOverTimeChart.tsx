import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    Area,
    AreaChart
} from 'recharts';
import { Box, Typography, Paper, Stack, Link as MuiLink, useTheme } from "@mui/material";
import { DashboardWidgetId } from "../widgetIds";

export const WIDGET_ID_DELIVERIES_OVER_TIME = DashboardWidgetId.DELIVERIES_OVER_TIME;

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
  { name: 'Jul', value: 1000 },
];

export const DeliveriesOverTimeChart = () => {
    const theme = useTheme();

    return (
        <Paper sx={{ p: 3, height: '400px', display: 'flex', flexDirection: 'column' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h6">Deliveries Over Time</Typography>
                <MuiLink href="#" sx={{ fontSize: '0.875rem', fontWeight: 600 }}>View Details</MuiLink>
            </Stack>
            <Box sx={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
                        <XAxis 
                            dataKey="name" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: theme.palette.text.secondary }}
                            dy={10}
                        />
                        <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: theme.palette.text.secondary }}
                        />
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: theme.palette.background.paper,
                                borderRadius: 8,
                                border: `1px solid ${theme.palette.divider}`,
                                boxShadow: theme.shadows[3]
                            }}
                        />
                        <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke={theme.palette.primary.main} 
                            strokeWidth={3}
                            dot={{ r: 4, fill: theme.palette.primary.main, strokeWidth: 2, stroke: theme.palette.background.paper }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Box>
        </Paper>
    );
};

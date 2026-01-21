import { 
    ComposedChart, 
    Line, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer 
} from 'recharts';
import { Box, Typography, Paper, Stack, Link as MuiLink, useTheme } from "@mui/material";
import { DashboardWidgetId } from "../widgetIds";

export const WIDGET_ID_REVENUE_VS_COST = DashboardWidgetId.REVENUE_VS_COST;

const data = [
  { name: 'Jan', revenue: 590, cost: 800, profit: 210 },
  { name: 'Feb', revenue: 868, cost: 967, profit: -99 },
  { name: 'Mar', revenue: 1397, cost: 1098, profit: 299 },
  { name: 'Apr', revenue: 1480, cost: 1200, profit: 280 },
  { name: 'May', revenue: 1520, cost: 1108, profit: 412 },
  { name: 'Jun', revenue: 1400, cost: 680, profit: 720 },
];

export const RevenueCostChart = () => {
    const theme = useTheme();

    return (
        <Paper sx={{ p: 3, height: '400px', display: 'flex', flexDirection: 'column' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h6">Revenue vs Cost</Typography>
                <MuiLink href="#" sx={{ fontSize: '0.875rem', fontWeight: 600 }}>Financial Report</MuiLink>
            </Stack>
            <Box sx={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 20,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
                        <XAxis 
                            dataKey="name" 
                            scale="band" 
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
                        <Legend wrapperStyle={{ paddingTop: '20px' }}/>
                        <Bar dataKey="revenue" barSize={20} fill={theme.palette.primary.main} name="Revenue" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="cost" barSize={20} fill={theme.palette.error.light} name="Cost" radius={[4, 4, 0, 0]} />
                        <Line type="monotone" dataKey="profit" stroke={theme.palette.success.main} strokeWidth={3} name="Profit Margin" dot={{ r: 4 }} />
                    </ComposedChart>
                </ResponsiveContainer>
            </Box>
        </Paper>
    );
};

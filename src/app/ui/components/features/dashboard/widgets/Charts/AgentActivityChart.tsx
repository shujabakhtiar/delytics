import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer 
} from 'recharts';
import { Box, Typography, Paper, Stack, Link as MuiLink, useTheme } from "@mui/material";
import { DashboardWidgetId } from "../widgetIds";

export const WIDGET_ID_AGENT_ACTIVITY = DashboardWidgetId.AGENT_ACTIVITY;

const data = [
  { time: '06:00', active: 20, idle: 5, offline: 10 },
  { time: '08:00', active: 50, idle: 10, offline: 5 },
  { time: '10:00', active: 80, idle: 15, offline: 2 },
  { time: '12:00', active: 70, idle: 20, offline: 5 },
  { time: '14:00', active: 85, idle: 10, offline: 3 },
  { time: '16:00', active: 60, idle: 25, offline: 10 },
  { time: '18:00', active: 40, idle: 30, offline: 20 },
];

export const AgentActivityChart = () => {
    const theme = useTheme();

    return (
        <Paper sx={{ p: 3, height: '400px', display: 'flex', flexDirection: 'column' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h6">Agent Activity</Typography>
                <MuiLink href="#" sx={{ fontSize: '0.875rem', fontWeight: 600 }}>View Details</MuiLink>
            </Stack>
            <Box sx={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
                        <XAxis 
                            dataKey="time" 
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
                        <Area type="monotone" dataKey="active" stackId="1" stroke={theme.palette.success.main} fill={theme.palette.success.main} fillOpacity={0.6} />
                        <Area type="monotone" dataKey="idle" stackId="1" stroke={theme.palette.warning.main} fill={theme.palette.warning.main} fillOpacity={0.6} />
                        <Area type="monotone" dataKey="offline" stackId="1" stroke={theme.palette.grey[500]} fill={theme.palette.grey[500]} fillOpacity={0.6} />
                    </AreaChart>
                </ResponsiveContainer>
            </Box>
        </Paper>
    );
};

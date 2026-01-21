import { Paper, Typography, Stack, Box, useTheme } from "@mui/material";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import MuiLink from '@mui/material/Link';

const data = [
    { name: 'Active', value: 45, color: '#10B981' },
    { name: 'Maintenance', value: 8, color: '#EF4444' },
    { name: 'Idle', value: 12, color: '#6B7280' },
];

export const FleetUtilizationChart = () => {
    const theme = useTheme();

    return (
        <Paper sx={{ p: 3, height: '400px', display: 'flex', flexDirection: 'column' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h6">Fleet Utilization</Typography>
                <MuiLink href="#" sx={{ fontSize: '0.875rem', fontWeight: 600 }}>View Details</MuiLink>
            </Stack>
            <Box sx={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            startAngle={180}
                            endAngle={0}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke={theme.palette.background.paper} />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: theme.palette.background.paper,
                                borderRadius: '8px',
                                border: `1px solid ${theme.palette.divider}`
                            }}
                        />
                        <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                </ResponsiveContainer>
            </Box>
        </Paper>
    );
};

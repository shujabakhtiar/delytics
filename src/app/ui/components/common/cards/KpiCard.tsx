import { Box, Typography, Paper, Stack } from "@mui/material";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface KpiCardProps {
    title: string;
    value: string;
    trend?: string;
    trendType?: 'up' | 'down';
    icon?: React.ReactNode;
}

export const KpiCard = ({ title, value, trend, trendType, icon }: KpiCardProps) => {
    return (
        <Paper 
            elevation={0}
            sx={{ 
                p: 2.5, 
                flex: 1, 
                minWidth: 200, 
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                    borderColor: 'primary.main',
                    transition: 'border-color 0.3s ease'
                }
            }}
        >
            <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        {title}
                    </Typography>
                    {icon && (
                        <Box sx={{ color: 'primary.main', opacity: 0.8 }}>
                            {icon}
                        </Box>
                    )}
                </Stack>
                
                <Stack direction="row" alignItems="baseline" spacing={1}>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {value}
                    </Typography>
                    
                    {trend && (
                        <Stack 
                            direction="row" 
                            alignItems="center" 
                            spacing={0.5}
                            sx={{ 
                                px: 1, 
                                py: 0.25, 
                                borderRadius: 1.5,
                                bgcolor: trendType === 'up' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                color: trendType === 'up' ? 'secondary.main' : 'error.main'
                            }}
                        >
                            {trendType === 'up' ? <TrendingUpIcon sx={{ fontSize: 14 }} /> : <TrendingDownIcon sx={{ fontSize: 14 }} />}
                            <Typography variant="caption" sx={{ fontWeight: 700 }}>
                                {trend}
                            </Typography>
                        </Stack>
                    )}
                </Stack>
            </Stack>
        </Paper>
    );
}
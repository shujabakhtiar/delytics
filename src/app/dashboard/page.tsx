"use client";

import { 
    Box, 
    Typography, 
    Stack, 
    Grid, 
    Paper, 
    Button, 
    Breadcrumbs, 
    Link as MuiLink,
    Divider
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { KpiCard } from "../components/common/KpiCard";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SpeedIcon from '@mui/icons-material/Speed';
import HubIcon from '@mui/icons-material/Hub';
import DownloadIcon from '@mui/icons-material/Download';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function Dashboard() {
    const theme = useTheme();
    
    return (
        <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: 'background.default', minHeight: '100%' }}>
            {/* Header Section */}
            <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                justifyContent="space-between" 
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                spacing={2}
                sx={{ mb: 4 }}
            >
                <Stack spacing={0.5}>
                    <Breadcrumbs 
                        separator={<NavigateNextIcon fontSize="small" />} 
                        aria-label="breadcrumb"
                        sx={{ mb: 1 }}
                    >
                        <MuiLink underline="hover" color="inherit" href="/" sx={{ fontSize: '0.875rem' }}>
                            Delytics
                        </MuiLink>
                        <Typography color="text.primary" sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                            Dashboard
                        </Typography>
                    </Breadcrumbs>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        Operational Overview
                    </Typography>
                </Stack>

                <Stack direction="row" spacing={2}>
                    <Button 
                        variant="outlined" 
                        startIcon={<CalendarMonthIcon />}
                        sx={{ bgcolor: 'background.paper' }}
                    >
                        Last 30 Days
                    </Button>
                    <Button 
                        variant="contained" 
                        startIcon={<DownloadIcon />}
                    >
                        Export
                    </Button>
                </Stack>
            </Stack>

            <Grid container spacing={3}>
                {/* KPI Row */}
                <Grid item xs={12} sm={6} lg={3}>
                    <KpiCard 
                        title="Total Deliveries" 
                        value="1,284" 
                        trend="+12.5%" 
                        trendType="up" 
                        icon={<LocalShippingIcon />} 
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <KpiCard 
                        title="SLA Compliance" 
                        value="94.2%" 
                        trend="-2.1%" 
                        trendType="down" 
                        icon={<AssessmentIcon />} 
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <KpiCard 
                        title="Avg. Delivery Time" 
                        value="24.5 min" 
                        trend="-1.5 min" 
                        trendType="up" // Lower is better for time
                        icon={<SpeedIcon />} 
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <KpiCard 
                        title="Active Hubs" 
                        value="12" 
                        trend="Stable" 
                        icon={<HubIcon />} 
                    />
                </Grid>

                {/* Charts Section */}
                <Grid item xs={12} lg={8}>
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
                            <Box sx={{ position: 'absolute', top: 0, left: 0, w: '100%', h: '100%', opacity: 0.1, pointerEvents: 'none' }}>
                                {[...Array(8)].map((_, i) => (
                                    <Divider key={i} sx={{ position: 'absolute', top: `${(i+1)*12.5}%`, w: '100%' }} />
                                ))}
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} lg={4}>
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
                </Grid>
            </Grid>
        </Box>
    );
}
"use client";

import { useEffect, useState, useCallback } from "react";
import { 
    Box, 
    Grid, 
    Paper, 
    Typography, 
    CircularProgress,
    Button,
    IconButton
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

import { useTheme } from '@mui/material/styles';
import { useAuth } from "@/app/ui/providers/AuthProvider";
import RoutedHeader from "@/app/ui/components/common/RoutedHeader";
import { 
    TotalDeliveriesCard, 
    SlaComplianceCard, 
    AvgDeliveryTimeCard, 
    ActiveHubsCard 
} from "./widgets/KpiCards";
import {
    DeliveriesOverTimeChart,
    AgentActivityChart,
    RevenueCostChart,
    RegionSlaChart,
    DeliveryStatusChart,
    FleetUtilizationChart
} from "./widgets/Charts";

import { DashboardWidgetId } from "./widgets/widgetIds";
import { AddKpiWidgetModal } from "./AddKpiWidgetModal";
import { AddLineChart } from "./AddLineChart";
import { AddSideChart } from "./AddSideChart";

// Map of widget IDs to components
const WIDGET_COMPONENT_MAP: Record<number, React.ComponentType> = {
    [DashboardWidgetId.TOTAL_DELIVERIES]: TotalDeliveriesCard,
    [DashboardWidgetId.SLA_COMPLIANCE]: SlaComplianceCard,
    [DashboardWidgetId.AVG_DELIVERY_TIME]: AvgDeliveryTimeCard,
    [DashboardWidgetId.ACTIVE_HUBS]: ActiveHubsCard,
    [DashboardWidgetId.DELIVERIES_OVER_TIME]: DeliveriesOverTimeChart,
    [DashboardWidgetId.AGENT_ACTIVITY]: AgentActivityChart,
    [DashboardWidgetId.REVENUE_VS_COST]: RevenueCostChart,
    [DashboardWidgetId.REGION_SLA]: RegionSlaChart,
    [DashboardWidgetId.DELIVERY_STATUS]: DeliveryStatusChart,
    [DashboardWidgetId.FLEET_UTILIZATION]: FleetUtilizationChart,
};

interface DashboardDetailContainerProps {
    dashboardId: number;
}

export default function DashboardDetailContainer({ dashboardId }: DashboardDetailContainerProps) {
    const theme = useTheme();
    const { token } = useAuth();
    const [dashboard, setDashboard] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAddWidgetModalOpen, setIsAddWidgetModalOpen] = useState(false);
    const [isAddLineChartOpen, setIsAddLineChartOpen] = useState(false);
    const [isAddSideChartOpen, setIsAddSideChartOpen] = useState(false);

    const fetchDashboard = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/dashboard?id=${dashboardId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            
            if (data.success) {
                setDashboard(data.data);
            } else {
                setError(data.error || 'Failed to fetch dashboard');
            }
        } catch (err) {
            setError('An error occurred while fetching dashboard');
        } finally {
            setLoading(false);
        }
    }, [dashboardId, token]);

    useEffect(() => {
        if (token) {
            fetchDashboard();
        }
    }, [fetchDashboard, token]);

    const handleLineChartSave = async (chartId: DashboardWidgetId) => {
        try {
            // Check if existing line chart widget exists
            const existingWidget = dashboard?.widgets?.find((w: any) => w.type === 'line-chart');

            if (existingWidget) {
                await fetch('/api/dashboard-widget', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({ id: existingWidget.id, queryConfig: { widgetDefinitionId: chartId } })
                });
            } else {
                await fetch('/api/dashboard-widget', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({ dashboardId, type: 'line-chart', queryConfig: { widgetDefinitionId: chartId }, visualConfig: {}, position: 0 })
                });
            }
            fetchDashboard();
        } catch (err) { console.error(err); }
    };

    const handleSideChartSave = async (chartId: DashboardWidgetId) => {
        try {
             const existingWidget = dashboard?.widgets?.find((w: any) => w.type === 'side-chart');

             if (existingWidget) {
                await fetch('/api/dashboard-widget', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({ id: existingWidget.id, queryConfig: { widgetDefinitionId: chartId } })
                });
             } else {
                await fetch('/api/dashboard-widget', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({ dashboardId, type: 'side-chart', queryConfig: { widgetDefinitionId: chartId }, visualConfig: {}, position: 1 })
                });
             }
             fetchDashboard();
        } catch (err) { console.error(err); }
    };


    if (loading && !dashboard) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error && !dashboard) {
        return (
            <Box sx={{ p: 4 }}>
                <Typography color="error">{error || 'Dashboard not found'}</Typography>
            </Box>
        );
    }

    const kpiWidgets = dashboard?.widgets?.filter((w: any) => w.type === 'kpi') || [];
    const lineChartWidget = dashboard?.widgets?.find((w: any) => w.type === 'line-chart');
    const sideChartWidget = dashboard?.widgets?.find((w: any) => w.type === 'side-chart');

    const LineChartComponent = lineChartWidget?.queryConfig?.widgetDefinitionId 
        ? WIDGET_COMPONENT_MAP[lineChartWidget.queryConfig.widgetDefinitionId] 
        : null;

    const SideChartComponent = sideChartWidget?.queryConfig?.widgetDefinitionId 
        ? WIDGET_COMPONENT_MAP[sideChartWidget.queryConfig.widgetDefinitionId] 
        : null;

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: 'background.default', minHeight: '100%' }}>
            {/* Header Section */}
            <RoutedHeader 
                title={dashboard?.name || 'Dashboard'}
                routedLinks={[
                    { label: "Delytics", href: "/" },
                    { label: "Dashboard", href: "/dashboard" },
                    { label: dashboard?.name || 'Details', href: `/dashboard/${dashboardId}` },
                ]}
            >
                <IconButton onClick={() => setIsAddWidgetModalOpen(true)}>
                    <EditIcon />
                </IconButton>
            </RoutedHeader>
            
            {/* KPI Section */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                {kpiWidgets.length > 0 ? (
                    kpiWidgets.map((widget: any) => {
                        const widgetDefId = widget.queryConfig?.widgetDefinitionId;
                        const WidgetComponent = widgetDefId ? WIDGET_COMPONENT_MAP[widgetDefId] : null;
                        
                        if (WidgetComponent) {
                            return (
                                <Grid key={widget.id} size={{ xs: 12, sm: 6, lg: 3 }}>
                                    <WidgetComponent />
                                </Grid>
                            );
                        }
                        return (
                            <Grid key={widget.id} size={{ xs: 12, sm: 6, lg: 3 }}>
                                <Paper sx={{ p: 2.5, minHeight: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography color="text.secondary">Unknown Widget {widgetDefId}</Typography>
                                </Paper>
                            </Grid>
                        );
                    })
                ) : (
                    <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                        <Paper 
                            sx={{ 
                                p: 2.5, 
                                height: 118,
                                display: 'flex', 
                                flexDirection: 'column',
                                alignItems: 'center', 
                                justifyContent: 'center',
                                border: '2px dashed',
                                borderColor: 'divider',
                                cursor: 'pointer',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    bgcolor: 'action.hover'
                                }
                            }}
                            onClick={() => setIsAddWidgetModalOpen(true)}
                        >
                            <AddIcon color="action" sx={{ fontSize: 32, mb: 0.5 }} />
                            <Typography color="text.secondary" fontWeight={500} variant="body2">
                                Add KPI Widget
                            </Typography>
                        </Paper>
                    </Grid>
                )}
            </Grid>

            {/* Charts Section */}
            <Grid container spacing={3}>
                {/* Wide Chart Section */}
                <Grid size={{ xs: 12, lg: 8 }}>
                    {LineChartComponent ? (
                     <Box sx={{ position: 'relative', height: '100%', minHeight: 400 }}>
                         <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
                            <Button 
                                startIcon={<EditIcon />} 
                                size="small" 
                                variant="outlined" 
                                onClick={() => setIsAddLineChartOpen(true)}
                                sx={{ bgcolor: 'background.paper' }}
                            >
                                Change Chart
                            </Button>
                         </Box>
                         <LineChartComponent />
                     </Box>
                    ) : (
                         <Paper 
                            sx={{ 
                                height: '100%', 
                                minHeight: 400,
                                display: 'flex', 
                                flexDirection: 'column',
                                alignItems: 'center', 
                                justifyContent: 'center',
                                border: '2px dashed',
                                borderColor: 'divider',
                                cursor: 'pointer',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    bgcolor: 'action.hover'
                                }
                            }}
                            onClick={() => setIsAddLineChartOpen(true)}
                        >
                            <AddIcon color="action" sx={{ fontSize: 40, mb: 1 }} />
                            <Typography color="text.secondary" fontWeight={500}>
                                Add Chart
                            </Typography>
                        </Paper>
                    )}
                </Grid>

                {/* Region SLA / Side Chart Section */}
                <Grid size={{ xs: 12, lg: 4 }}>
                     {SideChartComponent ? (
                     <Box sx={{ position: 'relative', height: '100%', minHeight: 400 }}>
                         <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
                            <Button 
                                startIcon={<EditIcon />} 
                                size="small" 
                                variant="outlined" 
                                onClick={() => setIsAddSideChartOpen(true)}
                                sx={{ bgcolor: 'background.paper' }}
                            >
                                Change Chart
                            </Button>
                         </Box>
                         <SideChartComponent />
                     </Box>
                    ) : (
                         <Paper 
                            sx={{ 
                                height: '100%', 
                                minHeight: 400,
                                display: 'flex', 
                                flexDirection: 'column',
                                alignItems: 'center', 
                                justifyContent: 'center',
                                border: '2px dashed',
                                borderColor: 'divider',
                                cursor: 'pointer',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    bgcolor: 'action.hover'
                                }
                            }}
                            onClick={() => setIsAddSideChartOpen(true)}
                        >
                            <AddIcon color="action" sx={{ fontSize: 40, mb: 1 }} />
                            <Typography color="text.secondary" fontWeight={500}>
                                Add Chart
                            </Typography>
                        </Paper>
                    )}
                </Grid>

            </Grid>

            <AddKpiWidgetModal 
                open={isAddWidgetModalOpen} 
                onClose={() => setIsAddWidgetModalOpen(false)} 
                dashboardId={dashboardId}
                onSuccess={fetchDashboard}
                currentWidgets={kpiWidgets}
            />
            
            <AddLineChart 
                open={isAddLineChartOpen} 
                onClose={() => setIsAddLineChartOpen(false)} 
                onSelect={handleLineChartSave}
                currentChartId={lineChartWidget?.queryConfig?.widgetDefinitionId || null}
            />

             <AddSideChart 
                open={isAddSideChartOpen} 
                onClose={() => setIsAddSideChartOpen(false)} 
                onSelect={handleSideChartSave}
                currentChartId={sideChartWidget?.queryConfig?.widgetDefinitionId || null}
            />

        </Box>
    );
}



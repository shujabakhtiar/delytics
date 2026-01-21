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
    RegionSlaChart
} from "./widgets/Charts";

import { DashboardWidgetId } from "./widgets/widgetIds";
import { AddKpiWidgetModal } from "./AddKpiWidgetModal";
import { AddLineChart } from "./AddLineChart";

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
                // Update
                await fetch('/api/dashboard-widget', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        id: existingWidget.id,
                        queryConfig: { widgetDefinitionId: chartId }
                    })
                });
            } else {
                // Create
                await fetch('/api/dashboard-widget', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        dashboardId,
                        type: 'line-chart',
                        queryConfig: { widgetDefinitionId: chartId },
                        visualConfig: {},
                        position: 0 
                    })
                });
            }
            fetchDashboard();
        } catch (err) {
            console.error(err);
            // Handle error (maybe toast)
        }
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
    
    // Resolve the component for the line chart
    const LineChartComponent = lineChartWidget?.queryConfig?.widgetDefinitionId 
        ? WIDGET_COMPONENT_MAP[lineChartWidget.queryConfig.widgetDefinitionId] 
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
                        // Use the stored widgetDefinitionId from queryConfig to find the correct component
                        const widgetDefId = widget.queryConfig?.widgetDefinitionId;
                        const WidgetComponent = widgetDefId ? WIDGET_COMPONENT_MAP[widgetDefId] : null;
                        
                        if (WidgetComponent) {
                            return (
                                <Grid key={widget.id} size={{ xs: 12, sm: 6, lg: 3 }}>
                                    <WidgetComponent />
                                </Grid>
                            );
                        }
                        // Fallback for unknown widget
                        return (
                            <Grid key={widget.id} size={{ xs: 12, sm: 6, lg: 3 }}>
                                <Paper sx={{ p: 2.5, minHeight: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography color="text.secondary">Unknown Widget {widgetDefId}</Typography>
                                </Paper>
                            </Grid>
                        );
                    })
                ) : (
                    // Empty state - Add Widget Placeholder (Takes up first slot)
                    <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                        <Paper 
                            sx={{ 
                                p: 2.5, 
                                minHeight: 140, // approximate height of KpiCard
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
                            <AddIcon color="action" sx={{ fontSize: 40, mb: 1 }} />
                            <Typography color="text.secondary" fontWeight={500}>
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
                         {/* Edit/Change Button for Chart */}
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
                         // Placeholder if no chart selected
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

                {/* Region SLA */}
                <Grid size={{ xs: 12, lg: 4 }}>
                    <RegionSlaChart />
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

        </Box>
    );
}



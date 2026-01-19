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
import { DashboardWidgetId } from "./widgets/widgetIds";
import { AddKpiWidgetModal } from "./AddKpiWidgetModal";

// Map of widget IDs to components
const WIDGET_COMPONENT_MAP: Record<number, React.ComponentType> = {
    [DashboardWidgetId.TOTAL_DELIVERIES]: TotalDeliveriesCard,
    [DashboardWidgetId.SLA_COMPLIANCE]: SlaComplianceCard,
    [DashboardWidgetId.AVG_DELIVERY_TIME]: AvgDeliveryTimeCard,
    [DashboardWidgetId.ACTIVE_HUBS]: ActiveHubsCard,
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
            
            <Grid container spacing={3}>
                {/* KPI Row */}
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
                    // Empty state - Add Widget Placeholder
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

            <AddKpiWidgetModal 
                open={isAddWidgetModalOpen} 
                onClose={() => setIsAddWidgetModalOpen(false)} 
                dashboardId={dashboardId}
                onSuccess={fetchDashboard}
                currentWidgets={kpiWidgets}
            />

        </Box>
    );
}


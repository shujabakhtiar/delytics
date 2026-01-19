"use client";

import { useEffect, useState } from "react";
import { 
    Box, 
    Grid, 
    Paper, 
    Typography, 
    CircularProgress,
    Button
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
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

    useEffect(() => {
        const fetchDashboard = async () => {
            if (!token) return;
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
        };

        if (token) {
            fetchDashboard();
        } else {
            // Should probably redirect or show loading until auth is ready
           // But dependent on AuthProvider logic
        }
    }, [dashboardId, token]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error || !dashboard) {
        return (
            <Box sx={{ p: 4 }}>
                <Typography color="error">{error || 'Dashboard not found'}</Typography>
            </Box>
        );
    }

    const kpiWidgets = dashboard.widgets?.filter((w: any) => w.type === 'kpi') || [];

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: 'background.default', minHeight: '100%' }}>
            {/* Header Section */}
            <RoutedHeader 
                title={dashboard.name}
                routedLinks={[
                    { label: "Delytics", href: "/" },
                    { label: "Dashboard", href: "/dashboard" },
                    { label: dashboard.name, href: `/dashboard/${dashboardId}` },
                ]}
            />
            
            <Grid container spacing={3}>
                {/* KPI Row */}
                {kpiWidgets.length > 0 ? (
                    kpiWidgets.map((widget: any) => {
                        // Assuming widget.id or some field maps to our known IDs. 
                        // The user said "give them a known int id. this should correspond with dashboardwidget in schema.prisma"
                        // But in the DB, the ID is autoincremented. 
                        // The user might have meant the *type* or a specific config ID.
                        // However, given the instruction "known int id... correspond with dashboardwidget", 
                        // I will assume for now we might map by ID if seeded, or maybe I should use `position` or just render distinct ones.
                        // actually the user previously asked to export constants like WIDGET_ID_TOTAL_DELIVERIES = 1.
                        // And in schema, DashboardWidget has an ID. 
                        // So if the DB row has id=1, it renders TotalDeliveriesCard.
                        
                        const WidgetComponent = WIDGET_COMPONENT_MAP[widget.id];
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
                                    <Typography color="text.secondary">Unknown Widget {widget.id}</Typography>
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
                        >
                            <AddIcon color="action" sx={{ fontSize: 40, mb: 1 }} />
                            <Typography color="text.secondary" fontWeight={500}>
                                Add KPI Widget
                            </Typography>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
}

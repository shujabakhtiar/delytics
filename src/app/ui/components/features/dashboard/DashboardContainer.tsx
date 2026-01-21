import { 
    Box, 
    Grid
} from "@mui/material";

import { useTheme } from '@mui/material/styles';
import {
    TotalDeliveriesCard,
    SlaComplianceCard,
    AvgDeliveryTimeCard,
    ActiveHubsCard
} from "./widgets/KpiCards";
import {
    DeliveriesOverTimeChart,
    RegionSlaChart,
    AgentActivityChart,
    RevenueCostChart,
    DeliveryStatusChart,
    FleetUtilizationChart
} from "./widgets/Charts";
import RoutedHeader from "@/app/ui/components/common/RoutedHeader";
import { CreateDashboardModal } from "./CreateDashboardModal";
import { AddLineChart } from "./AddLineChart";
import { AddSideChart } from "./AddSideChart";
import { DashboardWidgetId } from "./widgets/widgetIds";
import { useState } from "react";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

export default function DashboardContainer() {
    const theme = useTheme();
    const [selectedWideChart, setSelectedWideChart] = useState<DashboardWidgetId>(DashboardWidgetId.DELIVERIES_OVER_TIME);
    const [selectedSideChart, setSelectedSideChart] = useState<DashboardWidgetId>(DashboardWidgetId.REGION_SLA);
    const [isAddChartOpen, setIsAddChartOpen] = useState(false);
    const [isAddSideChartOpen, setIsAddSideChartOpen] = useState(false);

    const renderWideChart = () => {
        switch (selectedWideChart) {
            case DashboardWidgetId.DELIVERIES_OVER_TIME:
                return <DeliveriesOverTimeChart />;
            case DashboardWidgetId.AGENT_ACTIVITY:
                return <AgentActivityChart />;
            case DashboardWidgetId.REVENUE_VS_COST:
                return <RevenueCostChart />;
            default:
                return <DeliveriesOverTimeChart />;
        }
    };

    const renderSideChart = () => {
        switch (selectedSideChart) {
            case DashboardWidgetId.REGION_SLA:
                return <RegionSlaChart />;
            case DashboardWidgetId.DELIVERY_STATUS:
                return <DeliveryStatusChart />;
            case DashboardWidgetId.FLEET_UTILIZATION:
                return <FleetUtilizationChart />;
            default:
                return <RegionSlaChart />;
        }
    };

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: 'background.default', minHeight: '100%' }}>
            {/* Header Section */}
            <RoutedHeader
                title="Dashboard"
                routedLinks={[
                    { label: "Delytics", href: "/" },
                    { label: "Dashboard", href: "/dashboard" },
                ]}
            >
                <CreateDashboardModal />
            </RoutedHeader>
            <Grid container spacing={3}>

                {/* KPI Row */}
                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <TotalDeliveriesCard />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <SlaComplianceCard />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <AvgDeliveryTimeCard />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <ActiveHubsCard />
                </Grid>


                {/* Charts Section */}
                <Grid size={{ xs: 12, lg: 8 }}>
                     <Box sx={{ position: 'relative', height: '100%' }}>
                         {/* Edit/Change Button overlay or header action */}
                         <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
                            <Button 
                                startIcon={<EditIcon />} 
                                size="small" 
                                variant="outlined" 
                                onClick={() => setIsAddChartOpen(true)}
                                sx={{ bgcolor: 'background.paper' }}
                            >
                                Change Chart
                            </Button>
                         </Box>
                        {renderWideChart()}
                     </Box>
                </Grid>

                <Grid size={{ xs: 12, lg: 4 }}>
                     <Box sx={{ position: 'relative', height: '100%' }}>
                         {/* Edit/Change Button for Side Chart */}
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
                        {renderSideChart()}
                     </Box>
                </Grid>
            </Grid>
            
            <AddLineChart 
                open={isAddChartOpen} 
                onClose={() => setIsAddChartOpen(false)} 
                onSelect={(id) => setSelectedWideChart(id)}
                currentChartId={selectedWideChart}
            />

            <AddSideChart 
                open={isAddSideChartOpen} 
                onClose={() => setIsAddSideChartOpen(false)} 
                onSelect={(id) => setSelectedSideChart(id)}
                currentChartId={selectedSideChart}
            />
        </Box>
    );
}
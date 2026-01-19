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
    RegionSlaChart
} from "./widgets/Charts";
import RoutedHeader from "@/app/ui/components/common/RoutedHeader";
import { CreateDashboardModal } from "./CreateDashboardModal";

export default function DashboardContainer() {
    const theme = useTheme();

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
                    <DeliveriesOverTimeChart />
                </Grid>

                <Grid size={{ xs: 12, lg: 4 }}>
                    <RegionSlaChart />
                </Grid>
            </Grid>
        </Box>
    );
}
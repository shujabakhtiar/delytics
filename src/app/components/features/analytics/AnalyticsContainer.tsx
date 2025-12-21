import { Box, Grid } from "@mui/material";
import RoutedHeader from "../../common/RoutedHeader";
import { KpiCard } from "../../common/cards/KpiCard";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SpeedIcon from '@mui/icons-material/Speed';

export default function AnalyticsContainer() {
    return (
        <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: 'background.default', minHeight: '100%' }}>
            <RoutedHeader 
                title="Analytics"
                routedLinks={[
                    { label: "Delytics", href: "/" },
                    { label: "Dashboard", href: "/dashboard" },
                    { label: "Analytics", href: "/analytics" },
                ]}/>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <KpiCard 
                        title="Deliveries" 
                        value="1,284" 
                        trend="+12.5%" 
                        trendType="up" 
                        icon={<LocalShippingIcon />} 
                    />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <KpiCard 
                        title="SLA Compliance" 
                        value="94.2%" 
                        trend="-2.1%" 
                        trendType="down" 
                        icon={<AssessmentIcon />} 
                    />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <KpiCard 
                        title="Avg. Delivery Time" 
                        value="24.5 min" 
                        trend="-1.5 min" 
                        trendType="up" // Lower is better for time
                        icon={<SpeedIcon />} 
                    />
                    </Grid>
                </Grid>
        </Box>
    );
}
import { Box } from "@mui/material";
import RoutedHeader from "../../common/RoutedHeader";
import React from "react";

export default function AnalyticsContainer({ children }: { children: React.ReactNode }) {
    return (
        <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: 'background.default', minHeight: '100%' }}>
            <RoutedHeader 
                title="Analytics"
                routedLinks={[
                    { label: "Delytics", href: "/" },
                    { label: "Dashboard", href: "/dashboard" },
                    { label: "Analytics", href: "/analytics" },
                ]}/>
                {children}
        </Box>
    );
}
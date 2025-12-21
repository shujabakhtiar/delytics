import { Box } from "@mui/material";
import RoutedHeader from "../../common/RoutedHeader";
import React from "react";

export default function AnalyticsContainer({ children }: { children: React.ReactNode }) {
    return (
        <Box sx={{ 
            p: { xs: 2, md: 4 }, 
            bgcolor: 'background.default', 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }}>
            <Box sx={{ flexShrink: 0 }}>
                <RoutedHeader 
                    title="Analytics"
                    routedLinks={[
                        { label: "Delytics", href: "/" },
                        { label: "Dashboard", href: "/dashboard" },
                        { label: "Analytics", href: "/analytics" },
                    ]}/>
            </Box>
            <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {children}
            </Box>
        </Box>
    );
}
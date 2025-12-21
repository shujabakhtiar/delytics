"use client";

import AnalyticsContainer from "../../components/features/analytics/AnalyticsContainer";
import DeliveriesTable from "../../components/features/analytics/deliveries/DeliveriesTable";
import { Box } from "@mui/material";

export default function DeliveriesPage() {
    return (
        <AnalyticsContainer>
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                height: '100%',
                overflow: 'hidden'
            }}>
                <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
                    <DeliveriesTable />
                </Box>
            </Box>
        </AnalyticsContainer>
    );
}
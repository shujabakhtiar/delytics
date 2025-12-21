"use client";

import AnalyticsContainer from "../../components/features/analytics/AnalyticsContainer";
import DeliveriesTable from "../../components/features/analytics/deliveries/DeliveriesTable";
import { Typography, Box } from "@mui/material";

export default function DeliveriesPage() {
    return (
        <AnalyticsContainer>
            <Box sx={{ mt: 2 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                    Deliveries
                </Typography>
                <DeliveriesTable />
            </Box>
        </AnalyticsContainer>
    );
}
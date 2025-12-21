"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Drawer,
  Typography,
  Box,
  Divider,
  Stack,
  Chip,
} from "@mui/material";

// Mock Data
const mockDeliveries = [
  {
    id: 1,
    status: "Delivered",
    deliveryTimeMinutes: 24,
    deliveredAt: new Date().toISOString(),
    slaBreached: false,
    regionName: "Asia - Tokyo",
    agentName: "Kenji Tanaka",
    hubName: "Tokyo Central",
  },
  {
    id: 2,
    status: "In Transit",
    deliveryTimeMinutes: 45,
    deliveredAt: new Date().toISOString(),
    slaBreached: true,
    regionName: "Europe - Berlin",
    agentName: "Hans Muller",
    hubName: "Berlin North HUB",
  },
  {
    id: 3,
    status: "Delivered",
    deliveryTimeMinutes: 15,
    deliveredAt: new Date().toISOString(),
    slaBreached: false,
    regionName: "North America - NY",
    agentName: "John Smith",
    hubName: "Manhattan South",
  },
  {
    id: 4,
    status: "Pending",
    deliveryTimeMinutes: 0,
    deliveredAt: new Date().toISOString(),
    slaBreached: false,
    regionName: "South America - SP",
    agentName: "Maria Silva",
    hubName: "Sao Paulo HUB",
  },
  {
    id: 5,
    status: "Delivered",
    deliveryTimeMinutes: 32,
    deliveredAt: new Date().toISOString(),
    slaBreached: true,
    regionName: "Australia - Sydney",
    agentName: "David Jones",
    hubName: "Sydney East",
  },
];

export default function DeliveriesTable() {
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null);

  const handleRowClick = (delivery: any) => {
    setSelectedDelivery(delivery);
  };

  const closeDrawer = () => {
    setSelectedDelivery(null);
  };

  return (
    <Box>
      <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid", borderColor: "divider" }}>
        <Table sx={{ minWidth: 650 }} aria-label="deliveries table">
          <TableHead>
            <TableRow sx={{ bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)') }}>
              <TableCell sx={{ fontWeight: 600 }}>Delivery ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Delivery Minutes</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Delivered At</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>SLA Breached</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockDeliveries.map((delivery) => (
              <TableRow
                key={delivery.id}
                hover
                onClick={() => handleRowClick(delivery)}
                sx={{ cursor: "pointer", "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>#{delivery.id}</TableCell>
                <TableCell>
                  <Chip 
                    label={delivery.status} 
                    size="small" 
                    color={delivery.status === 'Delivered' ? 'success' : delivery.status === 'In Transit' ? 'primary' : 'default'}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>{delivery.deliveryTimeMinutes} min</TableCell>
                <TableCell>{new Date(delivery.deliveredAt).toLocaleString()}</TableCell>
                <TableCell>
                  <Chip 
                    label={delivery.slaBreached ? "Yes" : "No"} 
                    size="small"
                    color={delivery.slaBreached ? "error" : "success"}
                    sx={{ fontWeight: 600 }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Side Panel */}
      <Drawer
        anchor="right"
        open={Boolean(selectedDelivery)}
        onClose={closeDrawer}
        PaperProps={{
          sx: { width: 400, p: 3, bgcolor: 'background.paper' },
        }}
      >
        {selectedDelivery && (
          <Box>
            <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>
              Delivery Details
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Detailed breakdown for Delivery #{selectedDelivery.id}
            </Typography>
            
            <Divider sx={{ mb: 3 }} />

            <Stack spacing={3}>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                  Region Name
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {selectedDelivery.regionName}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                  Agent Name
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {selectedDelivery.agentName}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                  Hub Name
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {selectedDelivery.hubName}
                </Typography>
              </Box>

              <Divider />

              <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                    Current Status
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Chip label={selectedDelivery.status} color="primary" />
                  </Box>
              </Box>
            </Stack>
          </Box>
        )}
      </Drawer>
    </Box>
  );
}

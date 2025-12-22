"use client";

import React, { useState } from "react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
  Divider,
  Stack,
  Chip,
} from "@mui/material";
import PaginatedTable from "@/app/components/common/table/PaginatedTable";

// Mock Data
const singleMock = [
  { id: 1, status: "Delivered", deliveryTimeMinutes: 24, deliveredAt: new Date().toISOString(), slaBreached: false, regionName: "Asia - Tokyo", agentName: "Kenji Tanaka", hubName: "Tokyo Central" },
  { id: 2, status: "In Transit", deliveryTimeMinutes: 45, deliveredAt: new Date().toISOString(), slaBreached: true, regionName: "Europe - Berlin", agentName: "Hans Muller", hubName: "Berlin North HUB" },
  { id: 3, status: "Delivered", deliveryTimeMinutes: 15, deliveredAt: new Date().toISOString(), slaBreached: false, regionName: "North America - NY", agentName: "John Smith", hubName: "Manhattan South" },
  { id: 4, status: "Pending", deliveryTimeMinutes: 0, deliveredAt: new Date().toISOString(), slaBreached: false, regionName: "South America - SP", agentName: "Maria Silva", hubName: "Sao Paulo HUB" },
  { id: 5, status: "Delivered", deliveryTimeMinutes: 32, deliveredAt: new Date().toISOString(), slaBreached: true, regionName: "Australia - Sydney", agentName: "David Jones", hubName: "Sydney East" },
];

const mockDeliveries = [
  ...singleMock.map(d => ({ ...d })),
  ...singleMock.map(d => ({ ...d, id: d.id + 5 })),
  ...singleMock.map(d => ({ ...d, id: d.id + 10 })),
];

export default function DeliveriesTable() {
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const visibleRows = mockDeliveries.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <PaginatedTable
      totalCount={mockDeliveries.length}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={(_, newPage) => setPage(newPage)}
      onRowsPerPageChange={(e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
      }}
      isSidePanelOpen={Boolean(selectedDelivery)}
      onSidePanelClose={() => setSelectedDelivery(null)}
      sidePanelTitle="Delivery Details"
      sidePanelContent={
        selectedDelivery && (
          <Stack spacing={3}>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                # {selectedDelivery.id}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                Region Name
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, mt: 0.5 }}>
                {selectedDelivery.regionName}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                Agent Name
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, mt: 0.5 }}>
                {selectedDelivery.agentName}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                Hub Name
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, mt: 0.5 }}>
                {selectedDelivery.hubName}
              </Typography>
            </Box>

            <Divider />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                  Current Status
                </Typography>
                <Chip label={selectedDelivery.status} color="primary" size="small" />
            </Box>
          </Stack>
        )
      }
    >
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
        {visibleRows.map((delivery) => (
          <TableRow
            key={delivery.id}
            hover
            onClick={() => setSelectedDelivery(delivery)}
            selected={selectedDelivery?.id === delivery.id}
            sx={{
              cursor: "pointer",
              "&:last-child td, &:last-child th": { border: 0 },
              '&.Mui-selected': {
                backgroundColor: (theme) => `${theme.palette.primary.main}1A !important`,
              }
            }}
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
            <TableCell sx={{ whiteSpace: 'nowrap' }}>{new Date(delivery.deliveredAt).toLocaleString()}</TableCell>
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
    </PaginatedTable>
  );
}

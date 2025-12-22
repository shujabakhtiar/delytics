"use client";

import React, { useState, useMemo } from "react";
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
import { useTableFilters } from "@/hooks/use-table-filters";

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
  const { filters, isPending } = useTableFilters();
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredDeliveries = useMemo(() => {
    return mockDeliveries.filter((d) => {
      // Region Filter
      if (filters.region && !d.regionName.includes(filters.region as string)) {
        // Loose check for demo purposes
        const region = filters.region as string;
        // Check if "Asia" matches "Asia - Tokyo" roughly
        const regionParts = d.regionName.split(' - ');
        if (!region.includes(regionParts[0])) return false;
      }
      
      // Hub Filter
      if (filters.hub && !d.hubName.includes(filters.hub as string)) return false;
      
      // Status Filter
      if (filters.status && d.status !== filters.status) return false;
      
      // SLA Breach Filter
      if (filters.slaBreach === "true" && !d.slaBreached) return false;
      
      // Date Range Filter
      if (filters.startDate) {
        if (new Date(d.deliveredAt) < new Date(filters.startDate as string)) return false;
      }
      if (filters.endDate) {
         // Add 1 day to include the end date fully
         const end = new Date(filters.endDate as string);
         end.setDate(end.getDate() + 1);
         if (new Date(d.deliveredAt) >= end) return false;
      }

      return true;
    });
  }, [filters]);

  const visibleRows = filteredDeliveries.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ opacity: isPending ? 0.7 : 1, transition: 'opacity 0.2s', height: '100%', width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <PaginatedTable
        totalCount={filteredDeliveries.length}
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
    </Box>
  );
}

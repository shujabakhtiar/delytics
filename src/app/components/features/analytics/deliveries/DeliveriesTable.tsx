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
  IconButton,
  TablePagination,
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRowClick = (delivery: any) => {
    setSelectedDelivery(delivery);
  };

  const closeDrawer = () => {
    setSelectedDelivery(null);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = mockDeliveries.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ 
      display: 'flex', 
      width: '100%', 
      flex: 1,
      position: 'relative', 
      overflow: 'hidden',
      borderRadius: 1,
      border: '1px solid',
      borderColor: 'divider',
      bgcolor: 'background.paper'
    }}>
      {/* Table Section */}
      <Box sx={{ 
        flex: 1, 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        mr: selectedDelivery ? '300px' : 0,
        width: '100%',
        overflow: 'hidden'
      }}>
        <TableContainer sx={{ flex: 1, overflow: 'auto' }}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="deliveries table">
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
                  onClick={() => handleRowClick(delivery)}
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
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={mockDeliveries.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ borderTop: '1px solid', borderColor: 'divider' }}
        />
      </Box>

      {/* Side Panel (Emerged from the table) */}
      <Box
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: 300,
          bgcolor: 'background.paper',
          borderLeft: '1px solid',
          borderColor: 'divider',
          boxShadow: '-10px 0 20px rgba(0,0,0,0.05)',
          transform: selectedDelivery ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 2,
          p: 3,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {selectedDelivery && (
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        Delivery Details
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        # {selectedDelivery.id}
                    </Typography>
                </Box>
                <IconButton onClick={closeDrawer} size="small" sx={{ mt: -0.5, mr: -1 }}>
                    <Box sx={{ transform: 'rotate(45deg)', fontSize: '1.5rem', fontWeight: 300 }}>+</Box>
                </IconButton>
            </Stack>
            
            <Divider sx={{ my: 3 }} />

            <Stack spacing={3}>
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
          </Box>
        )}
      </Box>
    </Box>
  );
}

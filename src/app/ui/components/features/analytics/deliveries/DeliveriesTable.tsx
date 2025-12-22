import { useState, useEffect, useCallback } from "react";
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
  CircularProgress,
} from "@mui/material";
import PaginatedTable from "@/app/ui/components/common/table/PaginatedTable";
import { useTableFilters } from "@/app/ui/hooks/use-table-filters";
import DeliveriesRow from "./DeliveriesRow";
import { Delivery, deliveriesResource } from "@/app/ui/resources/deliveries/deliveryResource";
import DeliveriesSidepanel from "./DeliveriesSidepanel";

export default function DeliveriesTable() {
  const { filters, isPending: isFilterPending } = useTableFilters();
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDeliveries = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Create request filters
      const requestFilters = {
        ...filters,
        limit: rowsPerPage,
        page: page + 1, // API usually expects 1-indexed page
      };

      const response = await deliveriesResource.list(requestFilters as any);
      if (response.success) {
        setDeliveries(response.data.items);
        setTotalCount(response.data.meta.total);
      } else {
        throw new Error("Failed to fetch deliveries");
      }
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [filters, page, rowsPerPage]);

  useEffect(() => {
    fetchDeliveries();
  }, [fetchDeliveries]);

  // Reset page to 0 when filters change
  useEffect(() => {
    setPage(0);
  }, [filters]);

  return (
    <Box sx={{ 
      opacity: isFilterPending || isLoading ? 0.7 : 1, 
      transition: 'opacity 0.2s', 
      height: '100%', 
      width: '100%', 
      flex: 1, 
      display: 'flex', 
      flexDirection: 'column',
      position: 'relative'
    }}>
      {isLoading && (
        <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          zIndex: 1
        }}>
          <CircularProgress />
        </Box>
      )}

      {error ? (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="error" variant="h6">{error}</Typography>
        </Box>
      ) : (
        <PaginatedTable
          totalCount={totalCount}
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
              <DeliveriesSidepanel selectedDelivery={selectedDelivery} />
            )
          }
        >
          <TableHead>
            <TableRow sx={{ bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)') }}>
              <TableCell sx={{ fontWeight: 600 }}>Delivery ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Region</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Hub</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Delivery Minutes</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Delivered At</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>SLA Breached</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deliveries.map((delivery) => (
              <DeliveriesRow
                key={delivery.id}
                delivery={delivery}
                isSelected={selectedDelivery?.id === delivery.id}
                onClick={setSelectedDelivery}
              />
            ))}
            {!isLoading && deliveries.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                  <Typography variant="body1" color="text.secondary">
                    No deliveries found matching your search.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </PaginatedTable>
      )}
    </Box>
  );
}

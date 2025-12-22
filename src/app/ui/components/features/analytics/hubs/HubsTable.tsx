import { Box, CircularProgress, Typography, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import PaginatedTable from "../../../common/table/PaginatedTable";
import HubsRow from "../hubs/HubsRow";
import { useState, useEffect, useCallback } from "react";
import { useTableFilters } from "@/app/ui/hooks/use-table-filters";
import { Hub, hubsResource } from "@/app/ui/resources/hubs/hubsResource";
import { HubsSidepanel } from "./HubsSidepanel";


export default function HubsTable() {
    const { filters, isPending: isFilterPending } = useTableFilters();
      const [selectedHub, setSelectedHub] = useState<Hub | null>(null);
      const [page, setPage] = useState(0);
      const [rowsPerPage, setRowsPerPage] = useState(10);
      
      const [hubs, setHubs] = useState<Hub[]>([]);
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
      
            const response = await hubsResource.list(requestFilters as any);
            if (response.success) {
              setHubs(response.data.items);
              setTotalCount(response.data.meta.total);
            } else {
              throw new Error("Failed to fetch hubs");
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
          isSidePanelOpen={Boolean(selectedHub)}
          onSidePanelClose={() => setSelectedHub(null)}
          sidePanelTitle="Hub Details"
          sidePanelContent={
            selectedHub && (
              <HubsSidepanel selectedHub={selectedHub} />
            )
          }
        >
          <TableHead>
            <TableRow sx={{ bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)') }}>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Capacity</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Region</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hubs.map((hub) => (
              <HubsRow
                key={hub.id}
                hub={hub}
                isSelected={selectedHub?.id === hub.id}
                onClick={setSelectedHub}
              />
            ))}
            {!isLoading && hubs.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 8 }}>
                  <Typography variant="body1" color="text.secondary">
                    No hubs found matching your search.
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


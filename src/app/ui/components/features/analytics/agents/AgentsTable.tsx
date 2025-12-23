"use client";

import { Box, CircularProgress, Typography, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import PaginatedTable from "../../../common/table/PaginatedTable";
import AgentsRow from "./AgentsRow";
import { useState, useEffect, useCallback } from "react";
import { useTableFilters } from "@/app/ui/hooks/use-table-filters";
import { Agent, agentsResource } from "@/app/ui/resources/agents/agentsResource";
import AgentsSidepanel from "./AgentsSidepanel";

export default function AgentsTable() {
    const { filters, isPending: isFilterPending } = useTableFilters();
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
    const [agents, setAgents] = useState<Agent[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAgents = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const requestFilters = {
                ...filters,
                limit: rowsPerPage,
                page: page + 1,
            };
    
            const response = await agentsResource.list(requestFilters as any);
            console.log("response agents",response);
            if (response.success) {
                setAgents(response.data.items);
                setTotalCount(response.data.meta.total);
            } else {
                throw new Error("Failed to fetch agents");
            }
        } catch (err: any) {
            console.error("Fetch error:", err);
            setError(err.message || "An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    }, [filters, page, rowsPerPage]);
    
    useEffect(() => {
        fetchAgents();
    }, [fetchAgents]);
    
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
                    isSidePanelOpen={Boolean(selectedAgent)}
                    onSidePanelClose={() => setSelectedAgent(null)}
                    sidePanelTitle="Agent Details"
                    sidePanelContent={
                        selectedAgent && (
                            <AgentsSidepanel selectedAgent={selectedAgent} />
                        )
                    }
                >
                    <TableHead>
                        <TableRow sx={{ bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)') }}>
                            <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Region</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Hub</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {agents.map((agent) => (
                            <AgentsRow
                                key={agent.id}
                                agent={agent}
                                isSelected={selectedAgent?.id === agent.id}
                                onClick={setSelectedAgent}
                            />
                        ))}
                        {!isLoading && agents.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                                    <Typography variant="body1" color="text.secondary">
                                        No agents found matching your search.
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

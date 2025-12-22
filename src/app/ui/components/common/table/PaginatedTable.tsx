import {
  Box,
  Table,
  TableContainer,
  TablePagination,
  IconButton,
  Stack,
  Typography,
  Divider,
} from "@mui/material";

interface PaginatedTableProps {
  // Table Content
  children: React.ReactNode;
  
  // Pagination State
  totalCount: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  
  // Side Panel State
  isSidePanelOpen: boolean;
  onSidePanelClose: () => void;
  sidePanelTitle: string;
  sidePanelContent: React.ReactNode;
}

export default function PaginatedTable({
  children,
  totalCount,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  isSidePanelOpen,
  onSidePanelClose,
  sidePanelTitle,
  sidePanelContent,
}: PaginatedTableProps) {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flex: 1,
        position: "relative",
        overflow: "hidden",
        borderRadius: 1,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      {/* Table Section */}
      <Box
        sx={{
          flex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          mr: isSidePanelOpen ? "300px" : 0,
          width: "100%",
          overflow: "hidden",
        }}
      >
        <TableContainer sx={{ flex: 1, overflow: "auto" }}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="paginated table">
            {children}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          sx={{ borderTop: "1px solid", borderColor: "divider" }}
        />
      </Box>

      {/* Side Panel (Emerged from the table) */}
      <Box
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 300,
          bgcolor: "background.paper",
          borderLeft: "1px solid",
          borderColor: "divider",
          boxShadow: "-10px 0 20px rgba(0,0,0,0.05)",
          transform: isSidePanelOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 2,
          p: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {isSidePanelOpen && (
          <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              sx={{ mb: 1, flexShrink: 0 }}
            >
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {sidePanelTitle}
                </Typography>
              </Box>
              <IconButton onClick={onSidePanelClose} size="small" sx={{ mt: -0.5, mr: -1 }}>
                <Box
                  sx={{
                    transform: "rotate(45deg)",
                    fontSize: "1.5rem",
                    fontWeight: 300,
                  }}
                >
                  +
                </Box>
              </IconButton>
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ flex: 1, overflowY: "auto" }}>
              {sidePanelContent}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
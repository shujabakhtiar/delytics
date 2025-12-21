import { Box, Table, TableContainer, TableHead, TableBody } from "@mui/material";

export default function PaginatedTable() {
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

            </TableHead>
            <TableBody>

            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
    )
}
    
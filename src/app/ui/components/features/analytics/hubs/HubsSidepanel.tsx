import { Hub } from "@/app/ui/resources/hubs/hubsResource";
import { Box, Typography, Stack, Divider } from "@mui/material";

export const HubsSidepanel = ({ selectedHub }: { selectedHub: Hub }) => {
    return (
        <Stack spacing={3}>
            <Box>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                    Hub Name
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, mt: 0.5 }}>
                    {selectedHub.name}
                </Typography>
            </Box>

            <Box>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                    Capacity
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, mt: 0.5 }}>
                    {selectedHub.capacity}
                </Typography>
            </Box>

            <Box>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                    Region
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, mt: 0.5 }}>
                    {selectedHub.region?.name || `ID: ${selectedHub.regionId}`}
                </Typography>
            </Box>

            <Divider />

            <Box>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                    Created At
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, mt: 0.5 }}>
                    {new Date(selectedHub.createdAt).toLocaleDateString()}
                </Typography>
            </Box>
        </Stack>
    );
};
import { Agent } from "@/app/ui/resources/agents/agentsResource";
import { Box, Typography, Stack, Divider, Chip } from "@mui/material";

export default function AgentsSidepanel({ selectedAgent }: { selectedAgent: Agent }) {
    return (
        <Stack spacing={3}>
            <Box>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                    Agent Name
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, mt: 0.5 }}>
                    {selectedAgent.name}
                </Typography>
            </Box>

            <Box>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                    Status
                </Typography>
                <Box sx={{ mt: 0.5 }}>
                    <Chip 
                        label={selectedAgent.status} 
                        size="small" 
                        color={selectedAgent.status === 'ACTIVE' ? 'success' : 'default'} 
                        variant="outlined" 
                    />
                </Box>
            </Box>

            <Box>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                    Region
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, mt: 0.5 }}>
                    {selectedAgent.region?.name || `ID: ${selectedAgent.regionId}`}
                </Typography>
            </Box>

            <Box>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                    Hub
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, mt: 0.5 }}>
                    {selectedAgent.hub?.name || `ID: ${selectedAgent.hubId}`}
                </Typography>
            </Box>

            <Divider />

            <Box>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                    Created At
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, mt: 0.5 }}>
                    {new Date(selectedAgent.createdAt).toLocaleDateString()}
                </Typography>
            </Box>
        </Stack>
    );
}

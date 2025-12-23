import { Hub } from "@/app/ui/resources/hubs/hubsResource";
import { Box, Typography, Stack, Divider, Chip, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import CircleIcon from '@mui/icons-material/Circle';

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
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', display: 'block', mb: 1 }}>
                    Assigned Agents ({selectedHub.agents?.length || 0})
                </Typography>
                {selectedHub.agents && selectedHub.agents.length > 0 ? (
                    <List disablePadding>
                        {selectedHub.agents.map((agent) => (
                            <ListItem key={agent.id} disablePadding sx={{ mb: 1.5 }}>
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                    <PersonIcon fontSize="small" color="primary" />
                                </ListItemIcon>
                                <ListItemText 
                                    primary={agent.name}
                                    secondary={
                                        <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.25 }}>
                                            <CircleIcon sx={{ fontSize: 8, color: agent.status === 'active' ? 'success.main' : 'text.disabled' }} />
                                            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                                                {agent.status}
                                            </Typography>
                                        </Box>
                                    }
                                    primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                                />
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography variant="body2" color="text.disabled" sx={{ fontStyle: 'italic' }}>
                        No agents assigned to this hub.
                    </Typography>
                )}
            </Box>
        </Stack>
    );
};
import { Agent } from "@/app/ui/resources/agents/agentsResource";
import { TableRow, TableCell, Typography, Chip } from "@mui/material";

interface AgentsRowProps {
    agent: Agent;
    isSelected?: boolean;
    onClick: (agent: Agent) => void;
}

export default function AgentsRow({ 
    agent, 
    isSelected = false, 
    onClick 
}: AgentsRowProps) {
    return (
        <TableRow
            hover
            onClick={() => onClick(agent)}
            selected={isSelected}
            sx={{
                cursor: "pointer",
                "&.Mui-selected": {
                    backgroundColor: (theme) => `${theme.palette.primary.main}1A !important`,
                },
            }}
        >
            <TableCell>
                <Typography variant="body2" fontWeight={500}>
                    {agent.name}
                </Typography>
            </TableCell>
            <TableCell>
                <Chip 
                    label={agent.status} 
                    size="small" 
                    color={agent.status === 'ACTIVE' ? 'success' : 'default'} 
                    variant="outlined" 
                />
            </TableCell>
            <TableCell>{agent.region?.name || agent.regionId}</TableCell>
            <TableCell>{agent.hub?.name || agent.hubId}</TableCell>
        </TableRow>
    );
}

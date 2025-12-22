import { Hub } from "@/app/ui/resources/hubs/hubsResource";
import { TableRow, TableCell, Typography } from "@mui/material";

interface HubsRowProps {
    hub: Hub;
    isSelected?: boolean;
    onClick: (hub: Hub) => void;
}

export default function HubsRow({ 
    hub, 
    isSelected = false, 
    onClick 
}: HubsRowProps) {
    return (
        <TableRow
            hover
            onClick={() => onClick(hub)}
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
                    {hub.name}
                </Typography>
            </TableCell>
            <TableCell>{hub.capacity}</TableCell>
            <TableCell>{hub.region?.name || '-'}</TableCell>
        </TableRow>
    );
}
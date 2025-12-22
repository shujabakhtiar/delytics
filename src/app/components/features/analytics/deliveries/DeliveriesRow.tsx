import React from "react";
import { TableRow, TableCell, Chip } from "@mui/material";

type Delivery = {
  id: number;
  status: string;
  deliveryTimeMinutes: number;
  deliveredAt: string;
  slaBreached: boolean;
  regionName: string;
  agentName: string;
  hubName: string;
};

type DeliveriesRowProps = {
  delivery: Delivery;
  isSelected?: boolean;
  onClick: (delivery: Delivery) => void;
};

export default function DeliveriesRow({
  delivery,
  isSelected = false,
  onClick,
}: DeliveriesRowProps) {
  return (
    <TableRow
      hover
      onClick={() => onClick(delivery)}
      selected={isSelected}
      sx={{
        cursor: "pointer",
        "&:last-child td, &:last-child th": { border: 0 },
        "&.Mui-selected": {
          backgroundColor: (theme) => `${theme.palette.primary.main}1A !important`,
        },
      }}
    >
      <TableCell>#{delivery.id}</TableCell>
      <TableCell>
        <Chip
          label={delivery.status}
          size="small"
          color={
            delivery.status === "Delivered"
              ? "success"
              : delivery.status === "In Transit"
              ? "primary"
              : "default"
          }
          variant="outlined"
        />
      </TableCell>
      <TableCell>{delivery.deliveryTimeMinutes} min</TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>
        {new Date(delivery.deliveredAt).toLocaleString()}
      </TableCell>
      <TableCell>
        <Chip
          label={delivery.slaBreached ? "Yes" : "No"}
          size="small"
          color={delivery.slaBreached ? "error" : "success"}
          sx={{ fontWeight: 600 }}
        />
      </TableCell>
    </TableRow>
  );
}

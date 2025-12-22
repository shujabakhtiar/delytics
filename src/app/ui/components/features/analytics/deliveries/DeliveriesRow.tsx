import { Delivery } from "@/app/ui/resources/deliveries/deliveryResource";
import { TableRow, TableCell, Chip } from "@mui/material";

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
            delivery.status === "DELIVERED"
              ? "success"
              : delivery.status === "IN_TRANSIT"
              ? "primary"
              : "default"
          }
          variant="outlined"
        />
      </TableCell>
      <TableCell>{delivery.deliveryTimeMinutes ? `${delivery.deliveryTimeMinutes} min` : '-'}</TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>
        {delivery.deliveredAt ? new Date(delivery.deliveredAt).toLocaleString() : 'N/A'}
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

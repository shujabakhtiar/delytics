import { Stack, Box, Typography, Divider, Chip } from "@mui/material";
import { Delivery } from "@/app/ui/resources/deliveries/deliveryResource";

export default function DeliveriesSidepanel({selectedDelivery}: {selectedDelivery: Delivery}) {
    return (
        <Stack spacing={3}>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                    Region
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, mt: 0.5 }}>
                    {selectedDelivery.region?.name || `ID: ${selectedDelivery.regionId}`}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                    Agent
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, mt: 0.5 }}>
                    {selectedDelivery.agent?.name || `ID: ${selectedDelivery.agentId}`}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                    Hub
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, mt: 0.5 }}>
                    {selectedDelivery.hub?.name || `ID: ${selectedDelivery.hubId}`}
                  </Typography>
                </Box>

                <Divider />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                      Current Status
                    </Typography>
            <Chip
          label={selectedDelivery.status}
          size="small"
          color={
            selectedDelivery.status === "DELIVERED"
              ? "success"
              : selectedDelivery.status === "IN_TRANSIT"
              ? "primary"
              : "default"
          }
          variant="outlined"
        />                </Box>
              </Stack>
    );
}
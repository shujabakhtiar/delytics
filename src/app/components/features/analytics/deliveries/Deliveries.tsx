"use client";

import { Box } from "@mui/material";
import DeliveriesTable from "./DeliveriesTable";
import RoutedHeader from "@/app/components/common/RoutedHeader";
import DeliveryFiltersModal from "./DeliveryFiltersModal";

export default function Deliveries() {
    return (
            <Box sx={{ 
                   p: { xs: 2, md: 4 }, 
                   bgcolor: 'background.default', 
                   height: '100%',
                   display: 'flex',
                   flexDirection: 'column',
                   overflow: 'hidden'
               }}>
                   <Box sx={{ flexShrink: 0 }}>
                       <RoutedHeader 
                           title="Deliveries"
                           routedLinks={[
                               { label: "Delytics", href: "/" },
                               { label: "Analytics", href: "/overview" },
                               { label: "Deliveries", href: "/analytics/deliveries" },
                           ]}>
                            <DeliveryFiltersModal />
                            </RoutedHeader>
                   </Box>
        <Box sx={{ 
                       display: 'flex', 
                       flexDirection: 'column', 
                       height: '100%',
                       overflow: 'hidden'
                   }}>
                
                <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
                    <DeliveriesTable />
                </Box>
        </Box>  
        </Box>          
    );
}

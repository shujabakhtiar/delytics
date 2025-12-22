import { Box } from "@mui/material";
import FilterChips from "../../../common/FilterChips";
import RoutedHeader from "../../../common/RoutedHeader";
import HubsTable from "./HubsTable";
import HubsFiltersModal from "./HubsFilterModal";

export default function Hubs() {
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
                           title="Hubs"
                           routedLinks={[
                               { label: "Delytics", href: "/" },
                               { label: "Analytics", href: "/analytics/overview" },
                               { label: "Hubs", href: "/analytics/hubs" },
                           ]}>
                            <HubsFiltersModal />
                            </RoutedHeader>
                        <FilterChips /> 
                   </Box>
                   <Box sx={{ 
                       display: 'flex', 
                       flexDirection: 'column', 
                       height: '100%',
                       overflow: 'hidden'
                   }}>
                
                <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
                    <HubsTable />
                </Box>
            </Box>  
        </Box>       

    );
}
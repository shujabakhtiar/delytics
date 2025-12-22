"use client";

import { Box } from "@mui/material";
import FilterChips from "../../../common/FilterChips";
import RoutedHeader from "../../../common/RoutedHeader";
import AgentsTable from "./AgentsTable";
import AgentsFiltersModal from "./AgentsFilterModal";

export default function Agents() {
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
                           title="Agents"
                           routedLinks={[
                               { label: "Delytics", href: "/" },
                               { label: "Analytics", href: "/analytics/overview" },
                               { label: "Agents", href: "/analytics/agents" },
                           ]}>
                            <AgentsFiltersModal />
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
                    <AgentsTable />
                </Box>
            </Box>  
        </Box>       
    );
}

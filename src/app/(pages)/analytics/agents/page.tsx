"use client";

import RoutedHeader from "@/app/ui/common/RoutedHeader";
import { Box, Typography } from "@mui/material";

export default function AgentsPage() {
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
                               { label: "Analytics", href: "/overview" },
                               { label: "Agents", href: "/analytics/agents" },
                           ]}/>
                   </Box>
                   <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                   <Box sx={{ 
                       display: 'flex', 
                       flexDirection: 'column', 
                       height: '100%',
                       overflow: 'hidden'
                   }}>
                       <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
                           <Typography variant="h5" sx={{ fontWeight: 700 }}>
                               Agents
                           </Typography>
                       </Box>
                   </Box>           
                </Box>
               </Box>
    );
}
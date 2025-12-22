"use client";

import RoutedHeader from "@/app/components/common/RoutedHeader";
import { Box, Typography } from "@mui/material";

export default function AnalyticsPage() {
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
                           title="Analytics"
                           routedLinks={[
                               { label: "Delytics", href: "/" },
                               { label: "Analytics", href: "/analytics" },
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
                               Overview
                           </Typography>
                       </Box>
                   </Box>           
                </Box>
               </Box>
    );
}
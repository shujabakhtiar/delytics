"use client";

import { Box, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { KpiCard } from "../components/common/KpiCard";

export default function Dashboard() {
    const theme = useTheme();
    
    return (
        <Box
      sx={{
        width: '100%',  
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: theme.palette.background.default,
        p: 4,
      }}
    >
        <Typography variant="h5">
            Dashboard
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h4">
            KPIs
          </Typography>
          <div className="flex flex-row gap-4">
            <KpiCard title="Total deliveries" value="100" />
            <KpiCard title="SLA%" value="10" />
            <KpiCard title="Average time" value="20" />
            <KpiCard title="Active agents" value="30" /> 
          </div>
          <div className="flex flex-col gap-4">
            <Typography variant="h4">
              Deliveries over time
            </Typography>
            <div> LINE CHART HERRE </div>
          </div>
          <div className="flex flex-col gap-4">
            <Typography variant="h4">
              Region vs SLA
            </Typography>
            <div> BAR CHART HERE </div>
          </div>
        </Box>
        </Box>
    );
}
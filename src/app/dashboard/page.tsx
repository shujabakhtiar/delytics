"use client";

import { Box, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';

export default function Dashboard() {
    const theme = useTheme();
    
    return (
        <Box
      sx={{
        width: '100%',  
        minHeight: 'calc(100vh - 65px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.background.default,
        py: 8,
      }}
    >
        <Typography variant="h1">
            Dashboard
        </Typography>
        </Box>
    );
}
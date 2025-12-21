'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '@/app/ui/providers/ThemeRegistry';
import { useSidebar } from '@/app/ui/providers/SidebarProvider';

export default function Navbar() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const { toggleSidebar } = useSidebar();

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
        {/* Left Section: Menu + Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleSidebar}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              fontWeight: 700,
              fontSize: '1.25rem',
              color: 'text.primary',
              textDecoration: 'none',
              letterSpacing: '-0.02em',
            }}
          >
            DELYTICS
          </Typography>
        </Box>

        {/* Desktop Menu */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button color="inherit" sx={{ fontWeight: 500 }}>Features</Button>
          <Button color="inherit" sx={{ fontWeight: 500 }}>Pricing</Button>
          <Button color="inherit" sx={{ fontWeight: 500 }}>About</Button>
          
          {/* Theme Toggle */}
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          
          <Button variant="contained" color="primary" sx={{ ml: 2 }}>
              Sign In
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

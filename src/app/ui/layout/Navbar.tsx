'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '@/app/ui/providers/ThemeRegistry';
import { useSidebar } from '@/app/ui/providers/SidebarProvider';
import { useAuth } from '@/app/ui/providers/AuthProvider';
import RegionSelector from '../components/common/RegionSelector';
import { SignInModal } from '../components/features/auth/SignInModal';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Navbar() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const { toggleSidebar } = useSidebar();
  const { user, logout } = useAuth();
  
  const [signInOpen, setSignInOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

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
          {user && <RegionSelector />}
          
           {/* Theme Toggle */}
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          {user ? (
            <>
              <Box 
                onClick={handleMenuOpen}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1.5, 
                  cursor: 'pointer',
                  ml: 1,
                  '&:hover': { opacity: 0.8 }
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600, display: { xs: 'none', sm: 'block' } }}>
                  {user.name}
                </Typography>
                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32, 
                    fontSize: '0.875rem', 
                    bgcolor: theme.palette.primary.main,
                    fontWeight: 600
                  }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </Avatar>
              </Box>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }
                }}
              >
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button 
              variant="contained" 
              onClick={() => setSignInOpen(true)}
              sx={{ fontWeight: 600, px: 3 }}
            >
              Sign In
            </Button>
          )}
        </Box>
      </Toolbar>
      <SignInModal open={signInOpen} onClose={() => setSignInOpen(false)} />
    </AppBar>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Toolbar,
  IconButton,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { useSidebar } from "@/app/components/providers/SidebarProvider";

const drawerWidth = 260;

export default function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebar();
  const [openMenus, setOpenMenus] = React.useState({
    deliveries: true,
    analytics: false,
  });

  const toggleMenu = (key: keyof typeof openMenus) => {
    setOpenMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <Box sx={{ 
      width: isOpen ? drawerWidth : 0, 
      transition: 'width 0.2s',
      flexShrink: 0,
    }}>
      <Drawer
        variant="permanent"
        sx={{
          width: isOpen ? drawerWidth : 0,
          flexShrink: 0,
          overflow: 'hidden',
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: '1px solid',
            borderColor: 'divider',
            top: 0, 
            height: '100%',
            transition: 'transform 0.2s',
            transform: isOpen ? 'translateX(0)' : `translateX(-${drawerWidth}px)`,
          },
        }}
      >
        {/* Empty space for the fixed AppBar */}
        <Toolbar />

      <Box sx={{ 
        overflow: "auto", 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <List>

          {/* Dashboard */}
          <ListItemButton component={Link} href="/dashboard">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          {/* Deliveries (with sub-menu) */}
          <ListItemButton onClick={() => toggleMenu("deliveries")}>
            <ListItemIcon>
              <LocalShippingIcon />
            </ListItemIcon>
            <ListItemText primary="Deliveries" />
            {openMenus.deliveries ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openMenus.deliveries} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="All Deliveries" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Pending" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Completed" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Drivers */}
          <ListItemButton>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Drivers" />
          </ListItemButton>

          {/* Analytics (with sub-menu) */}
          <ListItemButton onClick={() => toggleMenu("analytics")}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Analytics" />
            {openMenus.analytics ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openMenus.analytics} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Overview" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Performance" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Settings */}
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>

        </List>

        {/* Sidebar Footer with Collapse Button */}
        <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={toggleSidebar} size="small">
            <KeyboardDoubleArrowLeftIcon />
          </IconButton>
        </Box>
      </Box>
    </Drawer>
  </Box>
  );
}

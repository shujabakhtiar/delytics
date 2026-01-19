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
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { useSidebar } from "@/app/ui/providers/SidebarProvider";
import { useAuth } from "@/app/ui/providers/AuthProvider";


import AddIcon from "@mui/icons-material/Add";
import { CreateDashboardModal } from "../components/features/dashboard/CreateDashboardModal";

const drawerWidth = 260;

export default function Sidebar() {
  const { user, token } = useAuth();
  const { isOpen, toggleSidebar } = useSidebar();
  const [openMenus, setOpenMenus] = React.useState({
    dashboard: true,
    analytics: false,
    boards: true, // Default open for visibility
  });
  const [dashboards, setDashboards] = React.useState<any[]>([]);

  const fetchDashboards = React.useCallback(async () => {
    if (!token) return;
    try {
        const res = await fetch('/api/dashboard', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
            setDashboards(data.data);
        }
    } catch(err) {
        console.error(err);
    }
  }, [token]);

  React.useEffect(() => {
    if (token) fetchDashboards();
  }, [token, fetchDashboards]);

  if (!user) return null;

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
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

           {/* Boards (with sub-menu) */}
           <ListItemButton onClick={() => toggleMenu("boards")}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Boards" />
            {openMenus.boards ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openMenus.boards} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {dashboards.map((board) => (
                   <ListItemButton 
                       key={board.id} 
                       component={Link} 
                       href={`/dashboard/${board.id}`} 
                       sx={{ pl: 4 }}
                    >
                    <ListItemText primary={board.name} />
                  </ListItemButton>
              ))}
              
              <CreateDashboardModal 
                  onDashboardCreated={fetchDashboards}
                  trigger={
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <AddIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Create Dashboard" />
                    </ListItemButton>
                  }
              />
            </List>
          </Collapse>

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
              <ListItemButton component={Link} href="/analytics/deliveries" sx={{ pl: 4 }}>
                <ListItemText primary="Deliveries" />
              </ListItemButton>
              <ListItemButton component={Link} href="/analytics/hubs" sx={{ pl: 4 }}>
                <ListItemText primary="Hubs" />
              </ListItemButton>
              <ListItemButton component={Link} href="/analytics/agents" sx={{ pl: 4 }}>
                <ListItemText primary="Agents" />
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

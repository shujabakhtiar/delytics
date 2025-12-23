"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Stack,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
  TextField,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useTableFilters } from "@/app/ui/hooks/use-table-filters";
import RegionSelector from "@/app/ui/components/common/RegionSelector";

const STATUSES = ["ACTIVE", "INACTIVE", "BUSY", "OFFLINE"];

export type AgentFilters = {
  name: string;
  region: string;
  regionId: string | number;
  hub: string;
  status: string;
};

const initialFilters: AgentFilters = {
  name: "",
  region: "",
  regionId: "",
  hub: "",
  status: "",
};

export default function AgentsFiltersModal() {
  const { filters: urlFilters, setFilters } = useTableFilters();
  const [open, setOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<AgentFilters>(initialFilters);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (open) {
      setLocalFilters({
        name: (urlFilters.name as string) || "",
        region: (urlFilters.region as string) || "",
        regionId: (urlFilters.regionId as string) || "",
        hub: (urlFilters.hub as string) || "",
        status: (urlFilters.status as string) || "",
      });
    }
  }, [open, urlFilters]);

  const handleApply = () => {
    setFilters(localFilters);
    handleClose();
  };

  const handleReset = () => {
    setLocalFilters(initialFilters);
  };

  const handleChange = (field: keyof AgentFilters, value: any) => {
    setLocalFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<FilterListIcon />}
        onClick={handleOpen}
        sx={{ 
          borderColor: 'divider',
          color: 'text.primary',
          textTransform: 'none',
          '&:hover': {
            borderColor: 'text.secondary',
            bgcolor: 'action.hover',
          }
        }}
      >
        Filters
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: fullScreen ? 0 : 2,
            backgroundImage: 'none',
          }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Typography fontWeight={600}>
            Filter Agents
          </Typography>
          <IconButton onClick={handleClose} aria-label="close" size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <Divider />

        <DialogContent sx={{ pt: 3 }}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Agent Name"
              value={localFilters.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Search by name..."
              size="small"
            />

            <RegionSelector
              isFilterButton={true}
              fullWidth
              value={localFilters.regionId}
              onChange={(value) => handleChange("regionId", value)}
            />

            <TextField
                fullWidth
                label="Hub Name"
                value={localFilters.hub}
                onChange={(e) => handleChange("hub", e.target.value)}
                placeholder="Search by hub name..."
                size="small"
            />

            <TextField
                select
                fullWidth
                label="Status"
                value={localFilters.status}
                onChange={(e) => handleChange("status", e.target.value)}
                size="small"
              >
                <MenuItem value=""><em>None</em></MenuItem>
                {STATUSES.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
            </TextField>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Button onClick={handleReset} color="inherit" sx={{ mr: 'auto' }}>
            Reset
          </Button>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleApply} variant="contained" disableElevation>
            Apply Filters
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

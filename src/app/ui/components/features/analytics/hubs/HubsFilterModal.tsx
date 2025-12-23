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
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useTableFilters } from "@/app/ui/hooks/use-table-filters";
import RegionSelector from "@/app/ui/components/common/RegionSelector";

export type HubsFilters = {
  name: string;
  region: string;
  regionId: string | number;
  minCapacity: string;
  maxCapacity: string;
};

const initialFilters: HubsFilters = {
  name: "",
  region: "",
  regionId: "",
  minCapacity: "",
  maxCapacity: "",
};

export default function HubsFiltersModal() {
  const { filters: urlFilters, setFilters } = useTableFilters();
  const [open, setOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<HubsFilters>(initialFilters);
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
        minCapacity: (urlFilters.minCapacity as string) || "",
        maxCapacity: (urlFilters.maxCapacity as string) || "",
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

  const handleChange = (field: keyof HubsFilters, value: any) => {
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
            Filter Hubs
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
              label="Hub Name"
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

            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom fontWeight={500}>
                Capacity Range
              </Typography>
              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  type="number"
                  label="Min Capacity"
                  value={localFilters.minCapacity}
                  onChange={(e) => handleChange("minCapacity", e.target.value)}
                  size="small"
                />
                <TextField
                  fullWidth
                  type="number"
                  label="Max Capacity"
                  value={localFilters.maxCapacity}
                  onChange={(e) => handleChange("maxCapacity", e.target.value)}
                  size="small"
                />
              </Stack>
            </Box>
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

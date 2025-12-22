"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  TextField,
  MenuItem,
  Stack,
  FormControlLabel,
  Switch,
  Typography,
  Box,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useTableFilters } from "@/app/ui/hooks/use-table-filters";

// Mock data options
const REGIONS = ["North America", "Europe", "Asia Pacific", "Latin America", "Middle East"];
const HUBS = ["New York", "London", "Singapore", "Tokyo", "Berlin", "Sao Paulo"];
const STATUSES = ["Pending", "In Transit", "Delivered", "Failed", "Returned"];

export type DeliveryFilters = {
  startDate: string;
  endDate: string;
  region: string;
  hub: string;
  status: string;
  slaBreach: boolean;
};

const initialFilters: DeliveryFilters = {
  startDate: "",
  endDate: "",
  region: "",
  hub: "",
  status: "",
  slaBreach: false,
};

export default function DeliveryFiltersModal() {
  const { filters: urlFilters, setFilters } = useTableFilters();
  const [open, setOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<DeliveryFilters>(initialFilters);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Sync local filters with URL params when modal opens
  useEffect(() => {
    if (open) {
      setLocalFilters({
        startDate: (urlFilters.startDate as string) || "",
        endDate: (urlFilters.endDate as string) || "",
        region: (urlFilters.region as string) || "",
        hub: (urlFilters.hub as string) || "",
        status: (urlFilters.status as string) || "",
        slaBreach: urlFilters.slaBreach === "true",
      });
    }
  }, [open, urlFilters]);

  const handleApply = () => {
    setFilters({
      ...localFilters,
      slaBreach: localFilters.slaBreach ? "true" : null,
    });
    handleClose();
  };

  const handleReset = () => {
    setLocalFilters(initialFilters);
  };

  const handleChange = (field: keyof DeliveryFilters, value: any) => {
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
          <Typography variant="h6" fontWeight={600}>
            Filter Deliveries
          </Typography>
          <IconButton onClick={handleClose} aria-label="close" size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <Divider />

        <DialogContent sx={{ pt: 3 }}>
          <Stack spacing={3}>
            {/* Date Range Section */}
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom fontWeight={500}>
                Date Range
              </Typography>
              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  type="date"
                  label="Start Date"
                  InputLabelProps={{ shrink: true }}
                  value={localFilters.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                  size="small"
                />
                <TextField
                  fullWidth
                  type="date"
                  label="End Date"
                  InputLabelProps={{ shrink: true }}
                  value={localFilters.endDate}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                  size="small"
                />
              </Stack>
            </Box>

            {/* Region & Hub Section */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
               <TextField
                select
                fullWidth
                label="Region"
                value={localFilters.region}
                onChange={(e) => handleChange("region", e.target.value)}
                size="small"
              >
                <MenuItem value=""><em>None</em></MenuItem>
                {REGIONS.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                fullWidth
                label="Hub"
                value={localFilters.hub}
                onChange={(e) => handleChange("hub", e.target.value)}
                size="small"
              >
                 <MenuItem value=""><em>None</em></MenuItem>
                {HUBS.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            {/* Status Section */}
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

            {/* SLA Breach Section */}
            <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                <FormControlLabel
                control={
                    <Switch
                    checked={localFilters.slaBreach}
                    onChange={(e) => handleChange("slaBreach", e.target.checked)}
                    color="error"
                    />
                }
                label={
                    <Typography variant="body2" fontWeight={500}>
                    Show SLA Breaches Only
                    </Typography>
                }
                />
                <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 0.5 }}>
                    Enable this to only see deliveries that have exceeded their service level agreement time.
                </Typography>
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

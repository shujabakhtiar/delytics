"use client";

import { Box, Chip, Slide, Typography } from "@mui/material";
import { useTableFilters } from "@/app/ui/hooks/use-table-filters";
import CancelTokenIcon from "@mui/icons-material/Cancel";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

type FilterChipsProps = {
  ignoreKeys?: string[];
  labelMap?: Record<string, string>;
};

const DEFAULT_IGNORE_KEYS = ["page", "per_page", "sort", "order"];

function formatKey(key: string): string {
  // CamelCase to Title Case
  const result = key.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export default function FilterChips({ 
  ignoreKeys = DEFAULT_IGNORE_KEYS, 
  labelMap = {} 
}: FilterChipsProps) {
  const { filters, updateFilter, resetFilters } = useTableFilters();

  const activeFilters = Object.entries(filters).filter(
    ([key]) => !ignoreKeys.includes(key)
  );

  if (activeFilters.length === 0) {
    return null;
  }

  const handleDelete = (key: string) => {
    updateFilter(key, null);
  };

  return (
    <Slide in={activeFilters.length > 0} direction="down" mountOnEnter unmountOnExit>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, alignItems: "center", py: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mr: 1, fontWeight: 500 }}>
          Active Filters:
        </Typography>
        {activeFilters.map(([key, value]) => (
          <Chip
            key={key}
            label={
              <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography component="span" variant="caption" sx={{ fontWeight: 600, mr: 0.5 }}>
                  {labelMap[key] || formatKey(key)}:
                </Typography>
                {String(value)}
              </Box>
            }
            onDelete={() => handleDelete(key)}
            size="small"
            color="primary"
            variant="outlined"
            deleteIcon={<CancelTokenIcon />}
          />
        ))}
        {activeFilters.length > 1 && (
             <Chip
             label="Clear All"
             onClick={resetFilters}
             size="small"
             variant="outlined"
             color="error"
             icon={<RestartAltIcon />}
             sx={{ border: 'none', '&:hover': { bgcolor: 'action.hover' } }}
           />
        )}
      </Box>
    </Slide>
  );
}

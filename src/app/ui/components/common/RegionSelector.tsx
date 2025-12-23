"use client";

import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, TextField, CircularProgress, Box } from "@mui/material";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { regionResource, Region } from "../../resources/regions/regionResource";

export interface RegionSelectorProps {
  isFilterButton?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  fullWidth?: boolean;
}

export default function RegionSelector({
  isFilterButton = false,
  value,
  onChange,
  label = "Region",
  fullWidth = false
}: RegionSelectorProps) {
    const [internalRegion, setInternalRegion] = React.useState('');
    const [regionsList, setRegionsList] = React.useState<Region[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    
    const region = value !== undefined ? value : internalRegion;

    // Fail-safe to prevent multiple concurrent requests (DDoS protection/Rate limiting)
    const isFetching = useRef(false);
    const searchTimeout = useRef<NodeJS.Timeout | null>(null);

    const fetchRegions = useCallback(async (pageNum: number, isInitial: boolean = false, search: string = '') => {
      if (isFetching.current && !isInitial) return;
      
      isFetching.current = true;
      if (isInitial) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }
      
      setError(null);
      try {
        const response = await regionResource.list({ 
          page: pageNum, 
          limit: 10,
          name: search || undefined
        });

        if(response.success){
          const newRegions = response.data.items;
          setRegionsList(prev => isInitial ? newRegions : [...prev, ...newRegions]);
          setHasMore(response.data.meta.page < response.data.meta.totalPages);
          setPage(pageNum);
        } else {
            throw new Error(response.error || "Failed to fetch regions");
        }
      } catch (error: any) {
        setError(error.message || 'Failed to fetch regions');
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
        isFetching.current = false;
      }
    }, []);

    useEffect(() => {
      fetchRegions(1, true, searchTerm);
    }, [fetchRegions, searchTerm]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
      searchTimeout.current = setTimeout(() => {
        setSearchTerm(val);
      }, 500);
    };

    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
      const listboxNode = event.currentTarget;
      
      // Calculate if we've reached near the bottom
      const isBottom = listboxNode.scrollTop + listboxNode.clientHeight >= listboxNode.scrollHeight - 20;
      
      if (
        isBottom &&
        hasMore &&
        !isLoadingMore &&
        !isFetching.current
      ) {
        fetchRegions(page + 1, false, searchTerm);
      }
    };

    const handleChange = (event: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = event.target.value as string;
      if (onChange) {
        onChange(newValue);
      } else {
        setInternalRegion(newValue);
      }
    };

    const renderMenuItems = () => {
      if (isLoading && regionsList.length === 0) {
        return [
          <MenuItem key="loading" disabled sx={{ justifyContent: 'center', py: 2 }}>
            <CircularProgress size={24} />
          </MenuItem>
        ];
      }

      const items = [
        <MenuItem key="none" value="">
          <em>None</em>
        </MenuItem>,
        ...regionsList.map((r) => (
          <MenuItem key={r.id} value={r.name}>
            {r.name}
          </MenuItem>
        ))
      ];

      if (isLoadingMore) {
        items.push(
          <MenuItem key="loading-more" disabled sx={{ justifyContent: 'center', py: 1 }}>
            <CircularProgress size={20} />
          </MenuItem>
        );
      }

      if (!isLoading && regionsList.length === 0 && searchTerm) {
        items.push(
          <MenuItem key="no-results" disabled>
            No regions found
          </MenuItem>
        );
      }

      return items;
    };

    const menuProps = {
      autoFocus: false, // Prevent autofocus so search input works better
      PaperProps: {
        onScroll: handleScroll as any,
        sx: { 
          maxHeight: 300,
          '& .MuiList-root': {
            pt: 0 // Remove padding to keep search field at the very top
          }
        }
      },
      // Keep the menu open when clicking inside search
      getContentAnchorEl: null,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left"
      },
      transformOrigin: {
        vertical: "top",
        horizontal: "left"
      }
    };

    const SearchHeader = (
      <Box sx={{ px: 2, py: 1, position: 'sticky', top: 0, bgcolor: 'background.paper', zIndex: 1, borderBottom: 1, borderColor: 'divider' }}>
        <TextField
          size="small"
          fullWidth
          placeholder="Search regions..."
          onChange={handleSearchChange}
          onKeyDown={(e) => e.stopPropagation()} // Prevent select closing on space/enter
          onClick={(e) => e.stopPropagation()}
        />
      </Box>
    );

    if (isFilterButton) {
      return (
        <TextField
          select
          fullWidth={fullWidth}
          label={label}
          value={region}
          onChange={handleChange}
          size="small"
          SelectProps={{
            MenuProps: menuProps as any
          }}
          disabled={isLoading && regionsList.length === 0 && !searchTerm}
        >
          {SearchHeader}
          {renderMenuItems()}
        </TextField>
      );
    }

    return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 170}} fullWidth={fullWidth}>
        <InputLabel id="region-selector-label">{label}</InputLabel>
        <Select
          labelId="region-selector-label"
          id="region-selector"
          value={region}
          onChange={handleChange as any}
          label={label}
          MenuProps={menuProps as any}
        >
          {SearchHeader}
          {renderMenuItems()}
        </Select>
      </FormControl>
    );
}
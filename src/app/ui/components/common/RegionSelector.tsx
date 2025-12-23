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
    
    const region = value !== undefined ? value : internalRegion;

    // Fail-safe to prevent multiple concurrent requests (DDoS protection/Rate limiting)
    const isFetching = useRef(false);

    const fetchRegions = useCallback(async (pageNum: number, isInitial: boolean = false) => {
      if (isFetching.current) return;
      
      isFetching.current = true;
      if (isInitial) {
        setIsLoading(true);
        setRegionsList([]);
      } else {
        setIsLoadingMore(true);
      }
      
      setError(null);
      try {
        const response = await regionResource.list({ page: pageNum, limit: 10 });
        if(response.success){
          const newRegions = response.data.items;
          setRegionsList(prev => isInitial ? newRegions : [...prev, ...newRegions]);
          setHasMore(response.data.meta.page < response.data.meta.totalPages);
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
      fetchRegions(1, true);
    }, [fetchRegions]);

    const handleScroll = (event: React.UIEvent<HTMLUListElement>) => {
      const listboxNode = event.currentTarget;
      if (
        listboxNode.scrollTop + listboxNode.clientHeight >= listboxNode.scrollHeight - 5 &&
        hasMore &&
        !isLoadingMore &&
        !isFetching.current
      ) {
        setPage(prev => {
          const nextPage = prev + 1;
          fetchRegions(nextPage);
          return nextPage;
        });
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

    const renderMenuItems = () => [
      <MenuItem key="none" value="">
        <em>None</em>
      </MenuItem>,
      ...regionsList.map((r) => (
        <MenuItem key={r.id} value={r.name}>
          {r.name}
        </MenuItem>
      )),
      isLoadingMore && (
        <MenuItem key="loading-more" disabled sx={{ justifyContent: 'center' }}>
          <CircularProgress size={20} />
        </MenuItem>
      )
    ];

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
            MenuProps: {
              PaperProps: {
                sx: { maxHeight: 300 }
              },
              MenuListProps: {
                onScroll: handleScroll as any
              }
            }
          }}
          disabled={isLoading && regionsList.length === 0}
        >
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
          MenuProps={{
            PaperProps: {
              sx: { maxHeight: 300 }
            },
            MenuListProps: {
              onScroll: handleScroll as any
            }
          }}
        >
          {renderMenuItems()}
        </Select>
      </FormControl>
    );
}
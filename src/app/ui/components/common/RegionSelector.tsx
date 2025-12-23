"use client";

import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { regionResource } from "../../resources/regions/regionResource";

export default function RegionSelector({isFilterButton}: {isFilterButton: boolean}) {
    const [region, setRegion] = React.useState('');
    const [regionsList, setRegionsList] = React.useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const handleChange = (event: SelectChangeEvent) => {
      setRegion(event.target.value as string);
    };

    const fetchRegions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await regionResource.list();
        if((response as any).success){
          setRegionsList(response.data); 
        } else {
            throw new Error("Failed to fetch regions");
        }
      } catch (error) {
        setError('Failed to fetch regions');
      }
      setIsLoading(false);
    };

    useEffect(() => {
      fetchRegions();
    }, []);

    return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 170}}>
        <InputLabel id="demo-simple-select-standard-label">Region</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={region}
          onChange={handleChange}
          label="Region"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {regionsList.map((region: any) => (
            <MenuItem key={region.id} value={region.name}>
              {region.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
}
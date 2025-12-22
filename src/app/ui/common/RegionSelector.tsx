"use client";

import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import React from "react";

export default function RegionSelector() {
    const [region, setRegion] = React.useState('');
    const handleChange = (event: SelectChangeEvent) => {
      setRegion(event.target.value as string);
    };
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
          <MenuItem value="Asia">Asia</MenuItem>
          <MenuItem value="Europe">Europe</MenuItem>
          <MenuItem value="Africa">Africa</MenuItem>
          <MenuItem value="North America">North America</MenuItem>
          <MenuItem value="South America">South America</MenuItem>
          <MenuItem value="Australia">Australia</MenuItem>
        </Select>
      </FormControl>
    );
}
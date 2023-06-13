"use client";
import React from "react";
import styles from "./../page.module.css";
import Sidebar from "../sidebar/page";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const User = () => {
  const [branch, setBranch] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setBranch(event.target.value as string);
  };

  return (
    <div className={styles.container}>
      <div>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <div>
          <h1 className={styles.textColor}>New User</h1>
          <div className={styles.input}>
            <Box sx={{ minWidth: 120, marginBottom: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Branch</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={branch}
                  label="Branch"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Buhangin</MenuItem>
                  <MenuItem value={20}>Mintal</MenuItem>
                  <MenuItem value={30}>Toril</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Code"
              variant="outlined"
              size="small"
            />

            <Button variant="contained" size="medium">
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;

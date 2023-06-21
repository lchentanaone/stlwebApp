"use client";
import React, { useState} from "react";
import styles from "./../page.module.css";
import Sidebar from "../sidebar/page";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const Accounting = () => {
    const [accounting, setAccounting] = React.useState("");

    const handleChange = (event: SelectChangeEvent) => {
        setAccounting(event.target.value as string);
  };
  return (
    <div className={styles.container}>
      <div>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <div>
          <h1 className={styles.textColor}>New Accounting Charts</h1>
          <div className={styles.input}>
         
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Account Title"
              variant="outlined"
              size="small"
            />
            <Box sx={{ minWidth: 120, marginBottom: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Branch</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={accounting}
                  label="Type 1"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Balance Sheet</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120, marginBottom: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Branch</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={accounting}
                  label="Type 2"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Balance Sheet</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120, marginBottom: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Branch</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={accounting}
                  label="Type 3"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Asset</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button variant="contained" size="medium">
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounting;

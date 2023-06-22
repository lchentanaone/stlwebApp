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

const Journal = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value} = event.target;
    const date = new Date(value);
    setSelectedDate(date);
  };
  return (
    <div className={styles.container}>
      <div>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <div>
          <h1 className={styles.textColor}>New Journal</h1>
          <div className={styles.input}>
            <Box sx={{ minWidth: 120, marginBottom: 2 }}>
                <FormControl fullWidth>
                    <label htmlFor="datePicker">Date</label>
                    <input type="date" id="demo-simple-select-label" value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''} onChange={handleChange} />
                </FormControl>
            </Box>
                    
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Branch"
              variant="outlined"
              size="small"
            />
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Type"
              variant="outlined"
              size="small"
            />
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Accounting Chart"
              variant="outlined"
              size="small"
            />
             <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Description"
              variant="outlined"
              size="small"
            />
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Amount"
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

export default Journal;

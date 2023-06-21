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

const Expenses = () => {
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
          <h1 className={styles.textColor}>New Expenses</h1>
          <div className={styles.input}>
          <Box sx={{ minWidth: 120, marginBottom: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" htmlFor="datePicker">Date</InputLabel>
                <input
                  id="datePicker"
                  type="date"
                  value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''} 
                  onChange={handleChange}
                />
               
              </FormControl>
            </Box>
            
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="User"
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
              label="Status"
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

export default Expenses;

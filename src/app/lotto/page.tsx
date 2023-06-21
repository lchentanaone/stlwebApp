"use client";
import React from "react";
import styles from "./../page.module.css";
import Sidebar from "../sidebar/page";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import { DatePicker } from '@mui/x-date-pickers-pro';
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const Lotto = () => {
  const [lotto, setLotto] = React.useState("");
  // const [selectedDate, setSelectedDate] = React.useState(null);

  // const handleDateChange = (date: React.SetStateAction<null>) => {
  //   setSelectedDate(date);
  // };
  const handleChange = (event: SelectChangeEvent) => {
    setLotto(event.target.value as string);
  };

  return (
    <div className={styles.container}>
      <div>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <div>
          <h1 className={styles.textColor}>New Lotto Result</h1>
          <div className={styles.input}>
          {/* <DatePicker
            label="Date"
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
          /> */}
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Draw Time"
              variant="outlined"
              size="small"
            />
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Game Mode"
              variant="outlined"
              size="small"
            />
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Number"
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

export default Lotto;

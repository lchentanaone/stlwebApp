"use client";
import React, { useState } from "react";
import styles from "./../page.module.css";
import Sidebar from "../sidebar/page";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';


const Bet = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    draw_time: '',
    game_mode: '',
    number: '',
    amount: '',
    user_ID: 2,
    
  });

  const handleDateChange = (date: React.SetStateAction<null>) => {
    setSelectedDate(date);
  };
  const handleChange = (event:any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/bets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const jsonData = await response.json();
      setResponseData(jsonData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <div>
          <h1 className={styles.textColor}>New Lotto Bets</h1>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="DateTime"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
          <div className={styles.input}>
          
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Draw DateTime"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Game Mode"
              variant="outlined"
              size="small"
              name="game_mode"
              onChange={handleChange}
            />
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Number"
              variant="outlined"
              size="small"
              name="number"
              onChange={handleChange}
            />
              <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Amount"
              variant="outlined"
              size="small"
              name="amount"
              onChange={handleChange}
            />
            
            <Button variant="contained" size="medium" onClick={fetchData} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Save'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bet;

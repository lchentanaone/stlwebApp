"use client";
import React, { useState } from "react";
import styles from "./../page.module.css";
import Sidebar from "../sidebar/page";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';


const Tapada = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    user: '',
    draw_time: '',
    runner_name: '',
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
      const response = await fetch('http://localhost:8000/tapada', {
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
          <h1 className={styles.textColor}>New Tapada</h1>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="DateTime"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
          
          <div className={styles.input}>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Draw Time"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
           
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Runner Name"
              variant="outlined"
              size="small"
              name="runner_name"
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

export default Tapada;

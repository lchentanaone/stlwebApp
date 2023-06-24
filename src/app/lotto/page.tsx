"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import styles from "./../page.module.css";
import Sidebar from "../sidebar/page";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';


const Lotto = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [pageTitle, setPageTitle] = useState('Add new lotto');
  const [selectedDate, setSelectedDate] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    draw_time: '',
    game_mode: '',
    number: '',
    
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.get('isEdit'))
    if(urlParams.get('isEdit')) {
      const id = urlParams.get('id');
      if(id) {
        setPageTitle("Edit user #" + id);
        fetchData(parseInt(id))
      }
    }
  }, [])

  const handleChange = (event:any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const addLotto = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/lotto', {
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

  const fetchData = async (id:number) => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/lotto/'+id);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setFormData({
        date: jsonData.date,
        draw_time: jsonData.draw_time,
        game_mode: jsonData.game_mode,
        number: jsonData.number,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
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
          <h1 className={styles.textColor}>{(pageTitle)}</h1>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="DateTime"
              // value={formData.date}
              // onChange={handleDateChange}
            />
          </LocalizationProvider>
          <div className={styles.input}>
          
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Draw Date"
              // value={formData.draw_time}
              // onChange={handleDateChange}
            />
          </LocalizationProvider>
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Game Mode"
              variant="outlined"
              size="small"
              name="game_mode"
              value={formData.game_mode}
              onChange={handleChange}
            />
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Number"
              variant="outlined"
              size="small"
              name="number"
              value={formData.number}
              onChange={handleChange}
            />
            
            <Button variant="contained" size="medium" onClick={addLotto} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Save'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lotto;

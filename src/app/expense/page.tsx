"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import styles from "./../page.module.css";
import Sidebar from "../sidebar/page";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';


const Expenses = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [pageTitle, setPageTitle] = useState('Add New Expenses');
  const [selectedDate, setSelectedDate] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    user: '',
    type: '',
    status: 'active',
    amount: '',
    user_ID: 20,

  });
  const urlParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    console.log(urlParams.get('isEdit'))
    if(urlParams.get('isEdit')) {
      const id = urlParams.get('id');
      if(id) {
        setPageTitle("Edit Expenses #" + id);
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

  const addExpenses = async () => {
    setIsLoading(true);

    if(urlParams.get('isEdit')) {
      const id = urlParams.get('id');
      try {
        await fetch(`http://localhost:8000/expense/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        setIsLoading(false);
        window.location.href="/expenses";
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    }
    else {
      try {
        const response = await fetch('http://localhost:8000/expense', {
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
    }
  };

  const fetchData = async (id:number) => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/expense/'+id);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setFormData({
        date: jsonData.date,
        user: jsonData.user,
        type: jsonData.type,
        status: jsonData.status,
        amount: jsonData.amount,
        user_ID: jsonData.user_ID,
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
          <div className={styles.input}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="DateTime"
              value={formData.date}
              // onChange={handleDateChange}
            />
          </LocalizationProvider>
          
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="User"
              variant="outlined"
              size="small"
              name="user"
              value={formData.user}
              onChange={handleChange}

            />
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Type"
              variant="outlined"
              size="small"
              name="type"
              value={formData.type}
              onChange={handleChange}
            />
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Status"
              variant="outlined"
              size="small"
              name="status"
              value={formData.status}
              onChange={handleChange}
            />
             <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Amount"
              variant="outlined"
              size="small"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
            <Button variant="contained" size="medium" onClick={addExpenses} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Save'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;

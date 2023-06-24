"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import styles from "./../page.module.css";
import Sidebar from "../sidebar/page";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';

const Journal = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [branch, setBranch] = React.useState("");
  const [pageTitle, setPageTitle] = useState('Add New Journal');
  const [selectedDate, setSelectedDate] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    branch: '',
    type: '',
    accounting: '',
    description:'',
    amount: '',
    branch_ID: 5,
    accounting_ID: 1,
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.get('isEdit'))
    if(urlParams.get('isEdit')) {
      const id = urlParams.get('id');
      if(id) {
        setPageTitle("Edit Journal #" + id);
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

  const addJournal = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/journal', {
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
      const response = await fetch('http://localhost:8000/journal/'+id);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setFormData({
        date: jsonData.date,
        branch: jsonData.branch,
        type: jsonData.type,
        accounting: jsonData.accounting,
        description:jsonData.description,
        amount: jsonData.amount,
        branch_ID: jsonData.branch_ID,
        accounting_ID: jsonData.accounting_ID,
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
              value={formData.date}
              // onChange={handleDateChange}
            />
          </LocalizationProvider>
          
          <div className={styles.input}>
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Branch"
              variant="outlined"
              size="small"
              name="branch"
              value={formData.branch}
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
              label="Accounting"
              variant="outlined"
              size="small"
              name="accounting"
              value={formData.accounting}
              onChange={handleChange}
            />
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Description"
              variant="outlined"
              size="small"
              name="description"
              value={formData.description}
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
            <Button variant="contained" size="medium" onClick={addJournal} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Save'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;

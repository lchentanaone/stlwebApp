"use client";
import React, { useState, useEffect } from "react";
import styles from "./../page.module.css";
import Sidebar from "../sidebar/page";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { format } from 'date-fns';

interface formData_i {
  date: any,
  type: string,
  description: string,
  amount: string,
  branch_ID: number,
  accounting_ID: number,
}

const Journal = () => {
  const token = localStorage.getItem('token');
    if (!token) { 
      window.location.href = '/';
      return false;
    } 
  const [branches, setBranches] = React.useState([]);
  const [accountings, setAccountings] = React.useState([]);
  const [pageTitle, setPageTitle] = useState('Add New Journal');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<formData_i>({
    date: new Date(),
    type: '',
    description:'',
    amount: '',
    branch_ID: 1,
    accounting_ID: 1,
  });
  const urlParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    console.log(urlParams.get('isEdit'))
    fetchBranches();
    fetchAccountings();
    if(urlParams.get('isEdit')) {
      const id = urlParams.get('id');
      if(id) {
        setPageTitle("Edit Journal #" + id);
        fetchData(parseInt(id))
      }
    }
  }, [])
  
  const handleDateChange = (value:any) => {
    const tempFormData = formData;
    tempFormData.date = new Date(value);

    setFormData(tempFormData);
  }

  const handleChange = (event:any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const addJournal = async () => {
    setIsLoading(true);

    const tempFormData = {...formData};
    const selectedDate = new Date(tempFormData.date);
    tempFormData.date = format(selectedDate, 'yyyy-MM-dd').toString();

    if(urlParams.get('isEdit')) {
      const id = urlParams.get('id');
      try {
        await fetch(`http://localhost:8000/journal/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        setIsLoading(false);
        window.location.href="/journals";
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    }
    else {
      try {
        const response = await fetch('http://localhost:8000/journal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const jsonData = await response.json();
        window.location.href="/journal";
        setIsLoading(false);
   
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    }
  };

  const fetchBranches = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/branch/');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      const branches = jsonData.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        }
      })
      setBranches(branches);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const fetchAccountings = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/accounting/');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      const accountings = jsonData.map((item: any) => {
        return {
          label: item.account_title,
          value: item.id
        }
      })
      setAccountings(accountings);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const fetchData = async (id:number) => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/journal/'+id);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      const selectedDate = new Date(jsonData.date);

      setFormData({
        date: selectedDate,
        type: jsonData.type,
        description:jsonData.description,
        amount: jsonData.amount,
        branch_ID: jsonData.branch.length > 0 ? jsonData.branch[0].id : 0,
        accounting_ID: jsonData.accounting.length > 0 ? jsonData.accounting[0].id : 0,
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
          <Box sx={{ minWidth: 120, marginBottom: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              value={formData.date}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
          </Box>
          <Box sx={{ minWidth: 120, marginBottom: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Branch</InputLabel>
                <Select 
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="branch_ID"
                  label="Branch"
                  onChange={handleChange}
                  value={formData.branch_ID}
                >
                  {branches.map((option:any) => (
                    <MenuItem key={option.value} value={option.value} selected={option.value === formData.branch_ID}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
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
             <Box sx={{ minWidth: 120, marginBottom: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Accounting</InputLabel>
                <Select 
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="accounting_ID"
                  label="Accounting"
                  onChange={handleChange}
                  value={formData.accounting_ID}
                >
                  {accountings.map((option:any) => (
                    <MenuItem key={option.value} value={option.value} selected={option.value === formData.accounting_ID}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
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

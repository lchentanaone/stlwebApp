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
import Select from "@mui/material/Select"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { format } from 'date-fns';

interface formData_i {
  date: any,
  type: string,
  status: string,
  amount : string,
  user_ID : number
}

const Expenses = () => {
  const token = localStorage.getItem('token');
    if (!token) { 
      window.location.href = '/';
      return false;
    } 
  const [isEdit, setIsEdit] = useState(false);
  const [users, setUsers] = React.useState([]);
  const [pageTitle, setPageTitle] = useState('Add New Expenses');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<formData_i>({
    date: new Date(),
    type: '',
    status: '',
    amount: '',
    user_ID: 1,
  });
  const urlParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    fetchUsers();
    if(urlParams.get('isEdit')) {
      const id = urlParams.get('id');
      if(id) {
        setPageTitle("Edit Expenses #" + id);
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

  const addExpenses = async () => {
    setIsLoading(true);

    const tempFormData = {...formData};
    const selectedDate = new Date(tempFormData.date);
    tempFormData.date = format(selectedDate, 'yyyy-MM-dd').toString();
    
    if(urlParams.get('isEdit')) {
      const id = urlParams.get('id');
      try {
        await fetch(`http://localhost:8000/expenses/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(tempFormData),
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
        const response = await fetch('http://localhost:8000/expenses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(tempFormData),
        });
        const jsonData = await response.json();
        window.location.href="/expenses";
        setIsLoading(false);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    }
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/user/');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      const users = jsonData.map((item: any) => {
        return {
          label: item.username,
          value: item.id
        }
      })
      setUsers(users);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const fetchData = async (id:number) => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/expenses/'+id);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      
      const selectedDate = new Date(jsonData.date);

      console.log({
        date: selectedDate,
        type: jsonData.type,
        status: jsonData.status,
        amount: jsonData.amount,
        user_ID: jsonData.user.length > 0 ? jsonData.user[0].id : 0
      })
      setFormData({
        date: selectedDate,
        type: jsonData.type,
        status: jsonData.status,
        amount: jsonData.amount,
        user_ID: jsonData.user.length > 0 ? jsonData.user[0].id : 0
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
                <InputLabel id="demo-simple-select-label">User</InputLabel>
                <Select 
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="User"
                  name="user_ID"
                  value={formData.user_ID}
                  onChange={handleChange}
                >
                  {users.map((option:any) => (
                    <MenuItem key={option.value} value={option.value} selected={option.value === formData.user_ID}>
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

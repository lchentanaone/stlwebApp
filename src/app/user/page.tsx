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

const User = () => {
  const token = localStorage.getItem('token');
    if (!token) { 
      window.location.href = '/';
      return false;
    } 
  const [isEdit, setIsEdit] = useState(false);
  const [branches, setBranches] = React.useState([]);
  const [responseData, setResponseData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageTitle, setPageTitle] = useState('Add new user');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    daily_rental: '',
    position: '',
    status: 'active',
    attendant_ID: '2',
    branch_ID: '1'
  });
  const urlParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    console.log(urlParams.get('isEdit'))
    fetchBranches();
    if(urlParams.get('isEdit')) {
      const id = urlParams.get('id');
      if(id) {
        setPageTitle("Edit user #" + id);
        fetchData(parseInt(id))
      }
    }
  }, [])

  const handleChange = (event:any) => {
    console.log('called')
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    console.log({formData})
  };

  const addUser = async () => {
    setIsLoading(true);

    if(urlParams.get('isEdit')) {
      const id = urlParams.get('id');
      try {
        await fetch(`http://localhost:8000/user/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        setIsLoading(false);
        window.location.href="/users";

      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    }
    else {
      try {
        const response = await fetch('http://localhost:8000/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const jsonData = await response.json();
        window.location.href="/users";

        // setResponseData(jsonData);
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

  const fetchData = async (id:number) => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/user/'+id);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setFormData({
        username: jsonData.username,
        password: jsonData.password,
        first_name: jsonData.first_name,
        middle_name: jsonData.middle_name,
        last_name: jsonData.last_name,
        daily_rental: jsonData.daily_rental,
        position: jsonData.position,
        status: jsonData.status,
        attendant_ID: jsonData.attendant_ID,
        branch_ID: jsonData.branch.length > 0 ? jsonData.branch[0].id : 0
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
              label="Username"
              variant="outlined"
              size="small"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              size="small"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              size="small"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Middle Name"
              variant="outlined"
              size="small"
              name="middle_name"
              value={formData.middle_name}
              onChange={handleChange}
            />
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              size="small"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
            <Box sx={{ minWidth: 120, marginBottom: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Position</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Position"
                  name="position"
                  size="small"
                  value={formData.position}
                  onChange={handleChange}
                >
                  <MenuItem value="cashier">Cashier</MenuItem>
                  <MenuItem value="runner">Runner</MenuItem>
                  <MenuItem value="collector">Collector</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Daily Rental"
              variant="outlined"
              size="small"
              name="daily_rental"
              value={formData.daily_rental}
              onChange={handleChange}
            />
            
            <Button variant="contained" size="medium" onClick={addUser} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Save'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;

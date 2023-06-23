"use client";
import React, { useState } from "react";
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
  const [branch, setBranch] = React.useState("");
  const [responseData, setResponseData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
    branch_ID: '4'
  });

  const handleChange = (event:any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/user', {
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
          <h1 className={styles.textColor}>New User</h1>
          <div className={styles.input}>
            <Box sx={{ minWidth: 120, marginBottom: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Branch</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={branch}
                  label="Branch"
                  // onChange={handleChange}
                >
                  <MenuItem value={10}>Buhangin</MenuItem>
                  <MenuItem value={20}>Mintal</MenuItem>
                  <MenuItem value={30}>Toril</MenuItem>
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
              onChange={handleChange}
            />
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              size="small"
              name="password"
              onChange={handleChange}
            />
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              size="small"
              name="first_name"
              onChange={handleChange}
            />
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Middle Name"
              variant="outlined"
              size="small"
              name="middle_name"
              onChange={handleChange}
            />
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              size="small"
              name="last_name"
              onChange={handleChange}
            />
            <Box sx={{ minWidth: 120, marginBottom: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Position</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={branch}
                  label="Position"
                  name="position"
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

export default User;

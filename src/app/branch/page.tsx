"use client";
import React, { useState } from "react";
import styles from "./../page.module.css";
import Sidebar from "../sidebar/page";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Branch = () => {
  const [responseData, setResponseData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    address: '',
    attendant_ID: '3'
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
          <h1 className={styles.textColor}>New Branch</h1>
          <div className={styles.input}>
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Code"
              variant="outlined"
              size="small"
              name="code"
              onChange={handleChange}

            />
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              size="small"
              name="name"
              onChange={handleChange}

            />
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Address"
              variant="outlined"
              size="small"
              name="address"
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

export default Branch;

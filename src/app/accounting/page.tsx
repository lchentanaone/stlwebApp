"use client";
import React, { useState } from "react";
import styles from "./../page.module.css";
import Sidebar from "../sidebar/page";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Accounting = () => {
  const [responseData, setResponseData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    account_title: '',
    classification: '',
    group: '',
    type: '',
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
      const response = await fetch('http://localhost:8000/accounting', {
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
          <h1 className={styles.textColor}>New Accounting</h1>
          
          <div className={styles.input}>
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Account Title"
              variant="outlined"
              size="small"
              name="account_title"
              onChange={handleChange}

            />
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Classification"
              variant="outlined"
              size="small"
              name="classification"
              onChange={handleChange}
            />
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Group"
              variant="outlined"
              size="small"
              name="group"
              onChange={handleChange}
            />
             <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Type"
              variant="outlined"
              size="small"
              name="type"
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

export default Accounting;

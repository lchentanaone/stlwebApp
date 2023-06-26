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

const Branch = () => {
  const [pageTitle, setPageTitle] = useState('Add New Branch');
  const [isEdit, setIsEdit] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    address: '',
    attendant_ID: '3'
  });
  const urlParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    console.log(urlParams.get('isEdit'))
    if(urlParams.get('isEdit')) {
      const id = urlParams.get('id');
      if(id) {
        setPageTitle("Edit branch #" + id);
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

  const addBranch = async () => {
    setIsLoading(true);

    if(urlParams.get('isEdit')) {
      const id = urlParams.get('id');
       try {
        await fetch(`http://localhost:8000/branch/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        setIsLoading(false);
        window.location.href="/branches";
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    }
    else {
      try {
        const response = await fetch('http://localhost:8000/branch', {
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
      const response = await fetch('http://localhost:8000/branch/'+id);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setFormData({
        code: jsonData.code,
        name: jsonData.name,
        address: jsonData.address,
        attendant_ID: jsonData.attendant_ID,
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
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Code"
              variant="outlined"
              size="small"
              name="code"
              value={formData.code}
              onChange={handleChange}
            />
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              size="small"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Address"
              variant="outlined"
              size="small"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <Button variant="contained" size="medium" onClick={addBranch} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Save'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branch;

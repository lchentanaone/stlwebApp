"use client";
import React from "react";
import styles from "./../page.module.css";
import Sidebar from "../sidebar/page";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Branch = () => {
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
            />
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              size="small"
            />
            <TextField
              style={{ width: 300, marginBottom: 10 }}
              id="outlined-basic"
              label="Address"
              variant="outlined"
              size="small"
            />
            <Button variant="contained" size="medium">
              Medium
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branch;

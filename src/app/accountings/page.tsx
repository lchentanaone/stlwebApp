"use client";
import React, {useEffect, useState} from "react";
import styles from "./../page.module.css";
import Sidebar from "../sidebar/page";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Button, CircularProgress } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const ViewExpenses = () => {
  const token = localStorage.getItem('token');
    if (!token) { 
      window.location.href = '/';
      return false;
    } 
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    console.log("fetchData called");
    try {
      const response = await fetch('http://localhost:8000/accounting/');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id:number) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/accounting/'+id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      fetchData();
      setTimeout(function() {
        setIsLoading(false);
      }, 1000)
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setTimeout(function() {
        setIsLoading(false);
      }, 1000)
    }
  };

  const handleUpdate = (id: any) => {
    window.location.href="/accounting/?isEdit=1&id="+id;
  };

  return (
    <div className={styles.container}>
      <div>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <TableContainer component={Paper}>
        <h1 className={styles.textColor}>Accounting Chart</h1>
          <Table aria-label="MuiTableSample">
            <TableHead>
              <TableRow>
                <TableCell>Account Title</TableCell>
                <TableCell>Classification</TableCell>
                <TableCell>Group</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {data.map((row:any) => (
                <TableRow key={row.id}>
                  <TableCell>{row.account_title}</TableCell>
                  <TableCell>{row.classification}</TableCell>
                  <TableCell>{row.group}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>
                    <Button variant="outlined" startIcon={<Edit />} onClick={() => handleUpdate(row.id)}>
                      Update
                    </Button>
                    <Button variant="outlined" startIcon={<Delete />} onClick={() => handleDelete(row.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {isLoading && (<div className={styles.vhcenter}><CircularProgress /></div>)}
    </div>
  );
};

export default ViewExpenses;

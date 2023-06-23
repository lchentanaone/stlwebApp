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

const ViewLotto = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/lotto/');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // const classes = useStyles();
  return (
    <div className={styles.container}>
      <div>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <TableContainer component={Paper}>
          <Table aria-label="MuiTableSample">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Draw Date</TableCell>
                <TableCell>Game Mode</TableCell>
                <TableCell>Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row:any) => (
                <TableRow key={row.id}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.draw_date}</TableCell>
                  <TableCell>{row.game_mode}</TableCell>
                  <TableCell>{row.number}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ViewLotto;

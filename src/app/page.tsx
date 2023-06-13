"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.textColor}>Login Page</h1>
      <form>
        <Box>
          <TextField
            style={{ width: 300 }}
            id="outlined-basic"
            label="username"
            variant="outlined"
          />
        </Box>
        <Button
          variant="contained"
          size="small"
          style={{ width: 300 }}
          href="/branch"
        >
          Signin
        </Button>
      </form>
    </main>
  );
}

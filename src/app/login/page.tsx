"use client";
import Link from "next/link";
import styles from "./../page.module.css";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";

const LoginPage = () => {
  return (
    <main className={styles.main}>
      <div>
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
          <Box>
            <TextField
              style={{ width: 300 }}
              id="outlined-basic"
              label="password"
              variant="outlined"
            />
          </Box>
          <Button variant="contained" size="small" style={{ width: 300 }}>
            Signin
          </Button>
        </form>
        <Link href="/branch" className={styles.b}>
          Sign in
        </Link>
      </div>
    </main>
  );
};

export default LoginPage;

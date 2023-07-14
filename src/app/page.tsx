"use client";
import Link from "next/link";
import styles from "./page.module.css";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSignin = async () => {
    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log('response: ', response); 
      
      if (response.ok) {
        const jsonData = await response.json();
        const token = jsonData.access_token;
        // Store the token in localStorage
        localStorage.setItem('token', token);
        setIsLoading(false);
        
        window.location.href = '/branch';
      } else {
        // Handle login error
        setErrorMessage('Login Failed');
      }
    } catch (error) {
      // Handle fetch error
      console.log('Error:', error);
    }
  };

  const handleChange = (event:any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <main className={styles.main}>
      <div className={styles.boxContainer}>
        <h1>Login Page</h1>
        <form>
          <Box>
            <TextField
              style={{ width: 300 }}
              id="outlined-basic"
              label="username"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <TextField
              style={{ width: 300 }}
              id="outlined-basic"
              label="password"
              variant="outlined"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Box>
          <Button disabled={isLoading} onClick={handleSignin} variant="contained" size="small" style={{ width: 300 }}>
            {isLoading ? 'Loading...' : 'Signin'}
          </Button>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </div>
    </main>
  );
};

export default LoginPage;

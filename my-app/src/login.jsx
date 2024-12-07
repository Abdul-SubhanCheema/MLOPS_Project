import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { TextField, Button, Container, Typography, Box } from '@mui/material';


function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', formData);
      localStorage.setItem('authToken', response.data.token); // Save the JWT token
      alert(response.data.message);
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      alert('Error: ' + error.response.data.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Login
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Login
        </Button>
        <Box sx={{ marginTop: 2 }}>
          <Button variant="contained" color="primary" onClick={()=>navigate('/')} fullWidth>
            Signup
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default Login;

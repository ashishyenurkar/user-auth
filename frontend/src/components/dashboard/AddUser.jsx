import React, { useState } from 'react';
import { Button, Drawer, TextField, MenuItem, Box, Typography } from '@mui/material';
import axios from 'axios';

const AddUser = ({ onUserAdded }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    type: ''
  });

  const userTypes = ['child', 'mother', 'father', 'teacher'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/user/register', formData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });

      onUserAdded(); // Refresh user list
      setOpen(false); // Close drawer
    } catch (error) {
      console.error('Error adding user:', error.response?.data || error.message);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add User
      </Button>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 300, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Register User
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              select
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              {userTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </form>
        </Box>
      </Drawer>
    </>
  );
};

export default AddUser;

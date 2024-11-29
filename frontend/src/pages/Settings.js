import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Settings = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    employeeId: '',
    department: '',
    email: '',
    password: '',
    showPassword: false,
  });

  const handleChange = (field, value) => {
    setUserDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveSettings = () => {
    console.log('Updated User Details:', userDetails);
    // API call or logic to save updated user details
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom>
          Account Settings
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              value={userDetails.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              value={userDetails.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Employee ID"
              variant="outlined"
              value={userDetails.employeeId}
              onChange={(e) => handleChange('employeeId', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Department"
              variant="outlined"
              value={userDetails.department}
              onChange={(e) => handleChange('department', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              value={userDetails.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type={userDetails.showPassword ? 'text' : 'password'}
              value={userDetails.password}
              onChange={(e) => handleChange('password', e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        handleChange('showPassword', !userDetails.showPassword)
                      }
                    >
                      {userDetails.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          onClick={handleSaveSettings}
        >
          Save Settings
        </Button>
      </Paper>
    </Box>
  );
};

export default Settings;

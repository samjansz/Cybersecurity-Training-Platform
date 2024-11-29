import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import axios from 'axios';

const EmailGenerator = () => {
  const [department, setDepartment] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = () => {
    setLoading(true);
    setError('');
    setEmailContent('');

    axios
      .post('http://localhost:8000/api/generate-email', { department })
      .then((response) => {
        setEmailContent(response.data.email);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to generate email. Please try again.');
        setLoading(false);
      });
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Email Generator
      </Typography>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom>
          Generate an Email Based on Department
        </Typography>
        <TextField
          fullWidth
          label="Department"
          variant="outlined"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerate}
          disabled={loading || !department.trim()}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Email'}
        </Button>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ marginBottom: 3 }}>
          {error}
        </Alert>
      )}

      {emailContent && (
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6">Generated Email</Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            {emailContent}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default EmailGenerator;

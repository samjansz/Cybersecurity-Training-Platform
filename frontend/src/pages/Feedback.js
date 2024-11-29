import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Divider } from '@mui/material';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);

  const handleFeedbackSubmit = () => {
    if (feedback.trim()) {
      setFeedbackList((prev) => [
        ...prev,
        { text: feedback, date: new Date().toLocaleString() },
      ]);
      setFeedback('');
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Feedback
      </Typography>

      <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6">Submit Your Feedback</Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          placeholder="Share your thoughts about the platform..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleFeedbackSubmit}
          disabled={!feedback.trim()}
        >
          Submit Feedback
        </Button>
      </Paper>

      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h6">Past Feedback</Typography>
        <Divider sx={{ marginY: 1 }} />
        {feedbackList.length > 0 ? (
          feedbackList.map((item, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <Typography variant="body1">{item.text}</Typography>
              <Typography variant="caption" color="text.secondary">
                {item.date}
              </Typography>
              <Divider sx={{ marginY: 1 }} />
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No feedback submitted yet.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Feedback;

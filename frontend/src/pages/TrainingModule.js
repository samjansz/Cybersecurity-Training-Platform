import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const TrainingModule = () => {
  return (
    <Card style={{ margin: 16 }}>
      <CardContent>
        <Typography variant="h5">Phishing Simulation</Typography>
        <Typography>
          Learn how to identify phishing emails with this interactive simulation.
        </Typography>
        <Button variant="contained" color="primary" style={{ marginTop: 16 }}>
          Start Training
        </Button>
      </CardContent>
    </Card>
  );
};

export default TrainingModule;

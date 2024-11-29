import React, { useState } from 'react';
import { Box, Button, Typography, Paper, TextField } from '@mui/material';

const Simulation = () => {
  const [simulationStarted, setSimulationStarted] = useState(false);
  const [logs, setLogs] = useState([]);

  const startSimulation = () => {
    setSimulationStarted(true);
    setLogs((prevLogs) => [
      ...prevLogs,
      `Simulation started at ${new Date().toLocaleTimeString()}`,
    ]);
  };

  const handleAction = (action) => {
    setLogs((prevLogs) => [
      ...prevLogs,
      `Action performed: ${action} at ${new Date().toLocaleTimeString()}`,
    ]);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Virtual Simulation Environment
      </Typography>

      {!simulationStarted ? (
        <Button variant="contained" color="primary" onClick={startSimulation}>
          Start Simulation
        </Button>
      ) : (
        <Box>
          <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h6">Simulation Controls</Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{ marginRight: 1 }}
              onClick={() => handleAction('Identify Phishing Email')}
            >
              Identify Phishing Email
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleAction('Report Malware')}
            >
              Report Malware
            </Button>
          </Paper>

          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Activity Logs</Typography>
            <Box sx={{ maxHeight: '200px', overflowY: 'auto' }}>
              {logs.map((log, index) => (
                <Typography key={index} variant="body2">
                  {log}
                </Typography>
              ))}
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default Simulation;


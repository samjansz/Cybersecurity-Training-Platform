import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Papa from 'papaparse';

const Dashboard = () => {
  const [rows, setRows] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [sortModel, setSortModel] = useState([
    {
      field: 'vulnerability_score',
      sort: 'asc',
    },
  ]);

  const csvFilePath = 'sample_vulnerability_results.csv';

  useEffect(() => {
    fetch(csvFilePath)
      .then((response) => response.text()) 
      .then((data) => {
        Papa.parse(data, {
          header: true, 
          skipEmptyLines: true, 
          complete: (result) => {
            const formattedData = result.data.map((row, index) => ({
              id: index + 1, // Assign a unique id to each row
              emp_id: row.emp_id,
              department: row.department,
              role: row.role,
              name: row.name,
              email: row.email,
              vulnerability_score: parseFloat(row.vulnerability_score),
            }));
            setRows(formattedData); 
          },
        });
      })
      .catch((error) => {
        console.error('Error loading CSV:', error); 
      });
  }, []);

  const handleDepartmentFilterChange = (event) => {
    setDepartmentFilter(event.target.value);
  };

  const handleSortChange = (newModel) => {
    setSortModel(newModel);
  };

  // Filter rows by department
  const filteredRows = departmentFilter
    ? rows.filter((row) => row.department === departmentFilter)
    : rows;

  const columns = [
    { field: 'emp_id', headerName: 'Employee ID', width: 150 },
    { field: 'department', headerName: 'Department', width: 180 },
    { field: 'role', headerName: 'Role', width: 180 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'vulnerability_score', headerName: 'Vulnerability Score', width: 180, type: 'number' },
  ];

  return (
    <Grid container spacing={3}>
      {/* Dashboard Overview */}
      <Grid item xs={12} md={6}>
        <Paper style={{ padding: 16 }}>
          <Typography variant="h6">Training Progress</Typography>
          <Typography>75% Completed</Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper style={{ padding: 16 }}>
          <Typography variant="h6">Recent Threats</Typography>
          <Typography>No new alerts</Typography>
        </Paper>
      </Grid>

      {/* Analytics Section */}
      <Grid item xs={12} md={12}>
        <Paper style={{ padding: 16 }}>
          <Typography variant="h6" gutterBottom>
            Vulnerability Score Table
          </Typography>

          {/* Department Filter */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="department-label">Filter by Department</InputLabel>
            <Select
              labelId="department-label"
              value={departmentFilter}
              label="Filter by Department"
              onChange={handleDepartmentFilterChange}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="IT">IT</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
              <MenuItem value="Business">Business</MenuItem>
              <MenuItem value="Marketing">Marketing</MenuItem>
            </Select>
          </FormControl>

          {/* Data Grid */}
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 25]}
              sortModel={sortModel}
              onSortModelChange={handleSortChange}
              disableSelectionOnClick
            />
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
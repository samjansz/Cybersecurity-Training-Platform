import React from 'react';
import { List, ListItem, ListItemText, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const links = [
    { path: '/', label: 'Dashboard' },
    { path: '/simulation', label: 'Simulations' },
    { path: '/email-generator', label: 'Email Generator' },
    { path: '/analytics', label: 'Analytics' },
    { path: '/training', label: 'Training Modules' },
    { path: '/feedback', label: 'Feedback' },
    { path: '/settings', label: 'Settings' },
  ];

  return (
    <Box sx={{ width: 240, paddingTop: 2 }}>
      <List>
        {links.map((link, index) => (
          <ListItem button component={Link} to={link.path} key={index}>
            <ListItemText primary={link.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;

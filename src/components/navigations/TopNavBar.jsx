import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function TopNavbar() {
  return (
    <AppBar position="static" sx={{backgroundColor: "#0B162C"}}>
      <Toolbar>
        <Typography variant="h6" component="div">
          Mon Application 
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopNavbar;

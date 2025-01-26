import React from 'react';
import { createTheme, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { Link, Outlet, useLocation } from 'react-router-dom'; // Import Outlet pour afficher les enfants
import DashboardIcon from '@mui/icons-material/Dashboard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ArticleIcon from '@mui/icons-material/Article';
import { AppProvider, DashboardLayout } from '@toolpad/core';

import logoFST from '../public/logo_FST.png';

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: {
    light: {
      palette: {
        mode: 'light',
      },
    },
    dark: {
      palette: {
        mode: 'dark',
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1280,
      xl: 1536,
    },
  },
});

function Tool() {
  const location = useLocation();

  const EDT = location.pathname.includes('/app');

  const NAVIGATION = [
    {
      segment: 'app',
      title: 'Emplois du Temps',
      icon: <DashboardIcon />,
    },
    {
      segment: 'admin',
      title: 'Admin',
      icon: <AdminPanelSettingsIcon />,
    },
    ...(EDT ? [
      { kind: 'divider' },
    {
      segment: 'tool',
      title: 'Outil',
      icon: <ArticleIcon />,
    },
    ]
  :[]),
    
  ];

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src={logoFST} alt="Logo FST" />,
        title: '',
        homeUrl: '/',
      }}
      theme={theme}
    >
      <DashboardLayout>
        <Box
          sx={{
            py: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
        </Box>
        <Outlet /> 
      </DashboardLayout>
    </AppProvider>
  );
}

Tool.propTypes = {
  window: PropTypes.func,
};

export default Tool;

import React from "react";
import { createTheme, Box } from "@mui/material";
import PropTypes from "prop-types";
import { Outlet, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ArticleIcon from "@mui/icons-material/Article";
import { AppProvider, DashboardLayout } from "@toolpad/core";
import { useWeeks } from "./WeekProvider";
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AbcIcon from '@mui/icons-material/Abc';
import SubjectIcon from '@mui/icons-material/Subject';

import logoFST from "../public/logo_FST.png";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
      },
    },
    dark: {
      palette: {
        mode: "dark",
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
  const {weeks} = useWeeks();

  const EDT = location.pathname.includes("/");
  const Admin = location.pathname.includes("/admin");

  const NAVIGATION = [
    {
      kind: "header",
      title: "Menu Principale"
    },
    {
      segment: "app",
      title: "Emplois du Temps",
      icon: <DashboardIcon />,
    },
    {
      segment: "admin",
      title: "Admin",
      icon: <AdminPanelSettingsIcon />,
    },
    ...(EDT && weeks.length > 0
      ? [
          { kind: "divider" },
          ...weeks.map((week, index) => ({
            segment: `week-${index}`,
            title: week.title,
            icon: <ArticleIcon />,
          })),
        ]
      : []),
    ...(Admin ? [
      {
        kind: "divider",
      },
      {
        segment: "admin/prof",
        title: "Professeur",
        icon: <SchoolRoundedIcon/>
      },
      {
        segment: "admin/niveau",
        title: "Niveau",
        icon: <AbcIcon/>,
      },
      {
        segment: "admin/matiere",
        title: "Matière",
        icon: <SubjectIcon/>,
      },
      {
        segment: "admin/salle",
        title: "Salle",
        icon: <MeetingRoomIcon/>
      },
    ] : []),
  ];

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src={logoFST} alt="Logo FST" style={{scale: '2', marginLeft: '20px'}}/>,
        title: "",
        homeUrl: "/",
      }}
      theme={theme}
    >
      <DashboardLayout>
        <Box
          sx={{
            py: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        ></Box>
        <Outlet />
      </DashboardLayout>
    </AppProvider>
  );
}

Tool.propTypes = {
  window: PropTypes.func,
};

export default Tool;

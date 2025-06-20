import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import ButtonSecondary from "../buttons/ButtonSecondary";
import FabButton from "../buttons/FabButton";

function TopNavbar({ titlesWithLevels }) {
  const [activeButton, setActiveButton] = useState("Tout Niveau");

  const handleButtonClick = (label) => {
    setActiveButton(label);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#0B162C" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", paddingX: 8, mr: 0.5 }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#FFF" }}>
            LOGO
          </Typography>
        </Box>

        <Grid container alignItems="stretch">
          <Grid item sx={{ textAlign: "center" }}>
            <Typography
              variant="h6"
              sx={{ visibility: "hidden", marginBottom: 1 }}
            >
              Invisible
            </Typography>
            <ButtonSecondary
              label={"Tout Niveau"}
              variant={"contained"}
              isActive={activeButton === "Tout Niveau"}
              onClick={() => handleButtonClick("Tout Niveau")}
            />
          </Grid>
          {titlesWithLevels.map((item, index) => (
            <Grid item key={index} sx={{ textAlign: "center" }}>
              <Typography
                variant="h6"
                sx={{
                  color: "#FFF",
                  marginBottom: 1,
                  fontSize: 14,
                  marginTop: 1.2,
                }}
              >
                {item.titre}
              </Typography>

              {item.levels.map((level, levelIndex) => (
                <ButtonSecondary
                  key={levelIndex}
                  label={level}
                  variant={"contained"}
                  isActive={activeButton === level}
                  onClick={() => handleButtonClick(level)}
                />
              ))}
            </Grid>
          ))}
          <Grid
            item
            sx={{
              textAlign: "center",
              // backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
              padding: 0,
              width: 40,
              marginLeft: 1.5
            }}
          >
            <Typography variant="h6" sx={{ visibility: "hidden", marginBottom: 1 }}>
              Invisible
            </Typography>
            <FabButton size={"small"}/>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default TopNavbar;

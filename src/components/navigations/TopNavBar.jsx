import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import ButtonSecondary from "../buttons/ButtonSecondary";
import FabButton from "../buttons/FabButton";
import CreateDialog from "../CreateDialog";
import { useAcademicTrack } from "../../services/useAcademicTrack";
import CreateLevelDialog from "../CreateLevelDialog";

function TopNavbar({ levels, onSelectAcademicTrack, currentAcademicTrack }) {
  const [activeButton, setActiveButton] = useState(currentAcademicTrack || "Tout Niveau");
  const [open, setOpen] = React.useState(false);

  const handleButtonClick = (label) => {
    setActiveButton(label);
    if(onSelectAcademicTrack){
      onSelectAcademicTrack(label === "Tout Niveau" ? null : label);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const trankName = (name, maxLength = 15) => {
    if (name.length > maxLength) {
      const words = name
        .split(" ")
        .filter(word => !"et".includes(word.toLowerCase()));
  
      const firstInitial =  words[0].substring(0, 4);
      const secondInitial = words[1].substring(0, 4);
  
      return `${firstInitial} . ${secondInitial}`.toLowerCase(); 
    }
  
    return name;
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
          sx={{ display: "flex", alignItems: "center", paddingX: 8.5, mr: 0.5 }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#FFF" }}>
            LOGO
          </Typography>
        </Box>

        <Grid container alignItems="stretch">
          <Grid sx={{ textAlign: "center" }}>
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
          {Array.isArray(levels) &&
            levels.map((level, index) => (
              <Grid key={level.id || index} sx={{ textAlign: "center" }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#FFF",
                    marginBottom: 1,
                    fontSize: 14,
                    marginTop: 1.2,
                  }}
                >
                  {level.name}
                </Typography>

                {Array.isArray(level.academic_tracks) &&
                  level.academic_tracks.map((track, trackIndex) => (
                    <ButtonSecondary
                      key={track.id || trackIndex}
                      label={trankName(track.name)}
                      variant={"contained"}
                      isActive={activeButton === track.id}
                      onClick={() => handleButtonClick(track.id)}
                    />
                  ))}
              </Grid>
            ))}
          <Grid
            sx={{
              textAlign: "center",
              // backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
              padding: 0,
              width: 40,
              marginLeft: 1.5,
            }}
          >
            <Typography
              variant="h6"
              sx={{ visibility: "hidden", marginBottom: 1 }}
            >
              Invisible
            </Typography>
            <FabButton size={"small"} onClick={handleClickOpen} />

            <CreateLevelDialog
              open={open}
              close={handleClose}
              titre={"Création de Niveau"}
              levels={levels}
              />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default TopNavbar;

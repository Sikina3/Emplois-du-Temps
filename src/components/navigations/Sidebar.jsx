import * as React from "react";
import {useState} from "react";
import Box from "@mui/material/Box";
import { Divider, Typography } from "@mui/material";
import FabButton from "../buttons/FabButton";
import InputText from "../InputText";
import CustomButton from "../buttons/CustomButton";
import ButtonSecondary from "../buttons/ButtonSecondary";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ViewDialog from "../ViewDialog";

function Custom_Sidebar({profs}) {
  const [activeButton, setActiveButton] = useState("Tout les professeurs");

  const handleButtonClick = (label) => {
    setActiveButton(label);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        width: 234,
        minWidth: 234,
        height: "100vh",
        backgroundColor: "#3B556D",
        color: "#FFFFFF",
        position: "relative",
      }}
      role="presentation"
    >
      <Box
        sx={{
          pb: 0,
          backgroundColor: "#A1B4C6",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          height: "50px",
          paddingX: 2,
          alignItems: "center",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ marginRight: 4, fontSize: "14px" }}
        >
          Professeurs
        </Typography>
        <FabButton size="small" sx={{width: "20px", height: "20px"}} onClick={handleClickOpen} />
        <ViewDialog 
          open={open} 
          handleClose={handleClose} 
          titre={"Création de professeurs"}
          champs={[
            {label: "Nom", name: "nom"},
            {label: "Prenom", name: "Prenom"},
          ]}/>
      </Box>

      <InputText label={"recherche professeurs"} sx={{width: "100%"}}/>
      <ButtonSecondary 
        label={"Tout les professeurs"} 
        variant={"contained"} 
        endIcon={<MoreVertIcon/>} 
        isActive={activeButton === "Tout les professeurs"}
        onClick={() => handleButtonClick("Tout les professeurs")}
        sx={{width: "100%", justifyContent: "space-between", marginTop: 5}}/>
      <Divider/>
      <Box
        sx={{
          marginTop: 2,
          height: "calc(100vh - 200px)", 
          overflowY: "auto",
        }}
      >
        {profs.map((prof, index) => (
          <ButtonSecondary
            key={index}
            label={prof.nom}
            variant={"contained"}
            sx={{
              width: "100%",
              fontSize: "12px",
              justifyContent: "space-between"
            }}
            isActive={activeButton === prof.nom}
            onClick={() => handleButtonClick(prof.nom)}
            endIcon={<MoreVertIcon/>}
          />
        ))}
      </Box>

      <CustomButton 
        label={"Gestion des Salles de classes"} 
        variant={"contained"}
        sx={{
          position: "absolute",
          bottom: 90,
          left: 0,
          width: "100%"
        }}/>
    </Box>
  );
}

export default Custom_Sidebar;

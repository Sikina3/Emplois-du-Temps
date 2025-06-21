import React, { useEffect } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Divider, Typography } from "@mui/material";
import FabButton from "../buttons/FabButton";
import InputText from "../InputText";
import CustomButton from "../buttons/CustomButton";
import ButtonSecondary from "../buttons/ButtonSecondary";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CreateDialog from "../CreateDialog";
import ViewDialog from "../ViewDialog";

import URL_API from "../../config/api";

function Custom_Sidebar() {
  const [activeButton, setActiveButton] = useState("Tout les professeurs");
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [profs, setProfs] = useState([]);
  const [salles, setSalles] = useState([]);

  useEffect(() => {
    fetch(`${URL_API}/classroom`)
      .then((response) => response.json())
      .then((data) => setSalles(data))
      .catch((error) => console.error("Error: ", error));
  }, []);

  useEffect(() => {
    fetch(`${URL_API}/professor`)
      .then((response) => response.json())
      .then((data) => setProfs(data))
      .catch((error) => console.error("Error: ", error));
  }, []);

  const handleButtonClick = (label) => {
    setActiveButton(label);
  };

  const handleOpenClassroom = () => {
    setOpenView(true);
  };
  const handleCloseClassroom = () => {
    setOpenView(false);
  };

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
        <FabButton
          size="small"
          sx={{ width: "20px", height: "20px" }}
          onClick={handleClickOpen}
        />
        <CreateDialog
          open={open}
          handleClose={handleClose}
          titre={"Création de professeurs"}
          champs={[
            { label: "Nom", name: "nom" },
            { label: "Prenom", name: "Prenom" },
          ]}
        />
      </Box>

      <InputText label={"recherche professeurs"} sx={{ width: "100%" }} />
      <ButtonSecondary
        label={"Tout les professeurs"}
        variant={"contained"}
        endIcon={<MoreVertIcon />}
        isActive={activeButton === "Tout les professeurs"}
        onClick={() => handleButtonClick("Tout les professeurs")}
        sx={{ width: "100%", justifyContent: "space-between", marginTop: 5 }}
      />
      <Divider />
      <Box
        sx={{
          marginTop: 2,
          height: "calc(100vh - 390px)",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "8px", 
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#A1B4C6", 
            borderRadius: "4px"
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent", 
          },
        }}
      >
        {profs.map((prof, index) => (
          <ButtonSecondary
            key={prof.id || index}
            label={`${prof.name}  ${prof.firstname} `}
            variant={"contained"}
            sx={{
              width: "100%",
              fontSize: "12px",
              justifyContent: "space-between",
            }}
            isActive={activeButton === prof.id}
            onClick={() => handleButtonClick(prof.id)}
            endIcon={<MoreVertIcon />}
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
          width: "100%",
        }}
        onClick={handleOpenClassroom}
      />
      <ViewDialog
        handleClose={handleCloseClassroom}
        open={openView}
        salles={salles}
      />
    </Box>
  );
}

export default Custom_Sidebar;

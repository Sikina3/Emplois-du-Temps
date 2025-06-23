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
  const [openSalle, setOpenSalle] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [profs, setProfs] = useState([]);
  const [salles, setSalles] = useState([]);
  const [newProf, setNewProf] = useState({ name: "", firstname: "" });
  const [newSalle, setNewSalle] = useState({ name: "", capacity: "" });

  useEffect(() => {
    fetch(`${URL_API}/classroom`)
      .then((response) => response.json())
      .then((data) => setSalles(data))
      .catch((error) => console.error("Error: ", error));

    fetch(`${URL_API}/professor`)
      .then((response) => response.json())
      .then((data) => {
        setProfs(data);
      })
      .catch((error) => console.error("Error: ", error));
  });

  const add_teach = async () => {
    try {
      const response = await fetch(`${URL_API}/professor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(newProf),
      });

      if (response.ok) {
        const data = await response.json();
        setProfs((prevProfs) => [...prevProfs, data]);
        setOpen(false);
      } else {
        const errorData = await response.json();
        console.error("Error lors de creation de professeurs");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const add_classroom = async () => {
    try {
      const response = await fetch(`${URL_API}/classroom`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(newSalle),
      });

      if (response.ok) {
        const data = await response.json();
        setSalles((prevSalles) => [...prevSalles, data]);
        console.log("Salles: ", data);
        setOpenView(true);
        setOpenSalle(false);
      } else {
        const errorData = await response.json();
        console.error("Error lors de creation de salle");
        console.log("Données envoyées:", newSalle);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

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

  const handleAdd = (event) => {
    event.preventDefault();
    add_teach();
  };

  const handleAddSalle = (event) => {
    event.preventDefault();
    add_classroom();
  };

  const handleInputChange = (field, value) => {
    setNewProf((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSalleInputChange = (field, value) => {
    setNewSalle((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleOpenCreateDialog = () => {
    setOpenSalle(true);
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
            { label: "Nom", name: "name" },
            { label: "Prenom", name: "firstname" },
          ]}
          onInputChange={handleInputChange}
          onClick={handleAdd}
          newProf={newProf}
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
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
        }}
      >
        {profs.map((prof, index) => (
          <ButtonSecondary
            key={prof.id || index}
            label={`${prof.name || ""}  ${prof.firstname || ""} `}
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
        openCreateDialog={handleOpenCreateDialog}
      />
      <CreateDialog
        open={openSalle}
        handleClose={() => setOpenSalle(false)}
        titre={"Création de salle"}
        champs={[
          { label: "Nom", name: "name" },
          { label: "Capacité", name: "capacity" },
        ]}
        onInputChange={handleSalleInputChange}
        onClick={handleAddSalle}
        newSalle={newSalle}
      />
    </Box>
  );
}

export default Custom_Sidebar;

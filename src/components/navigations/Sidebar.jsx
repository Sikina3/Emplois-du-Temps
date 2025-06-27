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
import { useProfesseurs } from "../../services/useProfesseurs";
import { useClassroom } from "../../services/useClassroom";


function Custom_Sidebar() {
  const [activeButton, setActiveButton] = useState("Tout les professeurs");
  const [open, setOpen] = useState(false);
  const [openSalle, setOpenSalle] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [newProf, setNewProf] = useState({ name: "", firstname: "" });
  const [newSalle, setNewSalle] = useState({ name: "", capacity: "" });

  const { getAll: getAllProf, create: createProf} = useProfesseurs();
  const { data: profData } = getAllProf();

  const { getAll: getAllClass, create: createClass } = useClassroom();
  const { data: dataClass} = getAllClass();


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
    createProf.mutate(newProf);
    setOpen(false);
    setNewProf({name: "", firstname: ""});
  };

  const handleAddSalle = (event) => {
    event.preventDefault();
    createClass.mutate(newSalle);
    setOpenSalle(false);
    setNewSalle({name: "", capacity: ""});
    
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
        {profData?.map((prof, index) => (
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
        salles={dataClass}
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

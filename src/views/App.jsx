import { useState } from "react";
import "../styles/App.css";
import Custom_Sidebar from "../components/navigations/Sidebar";
import TopNavbar from "../components/navigations/TopNavBar";
import CustomButton from "../components/buttons/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import CardSubject from "../components/CardSubject";
import { Box, Typography } from "@mui/material";
import InputText from "../components/InputText";
import ButtonSelect from "../components/buttons/ButtonSelect";

function App() {
  const titre = [
    { titre: "Licence 1", levels: ["tronc commun"] },
    { titre: "licence 2", levels: ["tronc commun"] },
    { titre: "Licence 3", levels: ["Maths info", "Ac. Info"] },
    {
      titre: "Master 1",
      levels: ["Ing. Maths", "img. Interaction", "genie info"],
    },
    {
      titre: "Master 2",
      levels: ["Ing. Maths", "img. Interaction", "genie info"],
    },
  ];

  const profs = [
    { nom: "Rakotonandrasana Marco" },
    { nom: "Velo Jérôme" },
    { nom: "Feno Rajaonasy Daniel" },
    { nom: "Andriamasinoro Hajaniarina" },
  ];

  const titre_matiere = [
    "Analyse 1",
    "Algèbre",
    "Astronomie",
    "Biologie",
    "Chimie",
    "Droit",
    "Économie",
    "Français",
    "Géométrie",
    "Histoire",
    "Informatique",
    "Journalisme",
    "Kinésiologie",
    "Littérature",
    "Mathématiques",
    "Nutrition",
    "Océanographie",
    "Philosophie",
    "Physique",
    "Programmation",
    "Quantique",
    "Robotique",
    "Sciences de la Terre",
    "Technologie",
    "Urbanisme",
    "Virologie",
    "Zoologie",
  ];

  const uniqueLetters = [
    ...new Set(titre_matiere.map((titre) => titre[0].toUpperCase())),
  ];

  return (
    <>
      <TopNavbar titlesWithLevels={titre} />
      <div className="container">
        <Custom_Sidebar profs={profs} />

        <div className="right-div">
          <div className="div-chearch">
            {/** Place du bar de recherche */}
            <Typography variant="overline">
              Tout les cours enseignés par :
            </Typography>

            <InputText label={"Rechercher une matiere"} sx={{ width: "50%" }} />
          </div>

          <div className="div-creation">
            {/**Button et son accolite */}
            <CustomButton
              label={"Crée un nouveau module"}
              startIcon={<AddIcon />}
              variant={"contained"}
            />
            <div style={{display: "flex", alignItems: "center"}}>
              <Typography variant="overline">
                trier par :
              </Typography>
              <ButtonSelect
                options={["Ordre alphabetique", "Par niveau", "Option 3"]}
                placeholder="Sélectionner un module"
                onChange={(val) => console.log("Tu as choisi :", val)}
              />
            </div>
          </div>

          <div className="cards-container">
            {" "}
            {/**Les cards  */}
            {uniqueLetters.map((letter, index) => (
              <div key={index} className="card-wrapper">
                <CardSubject titles={titre_matiere} letter={letter} />
              </div>
            ))}
          </div>

          <div className="action-button">
            {" "}
            {/** et Les boutons d'action pour finir */}
            <CustomButton 
              label="Enregistrer"
              sx={{paddingY: 0.5, paddingX: 6}} />

            <CustomButton 
              label="Generer" 
              variant={"contained"}
              sx={{paddingY: 0.5, paddingX: 6}} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

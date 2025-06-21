import { useState, useEffect } from "react";
import "../styles/App.css";
import Custom_Sidebar from "../components/navigations/Sidebar";
import TopNavbar from "../components/navigations/TopNavBar";
import CustomButton from "../components/buttons/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import CardSubject from "../components/CardSubject";
import { Box, Typography, CircularProgress } from "@mui/material";
import InputText from "../components/InputText";
import ButtonSelect from "../components/buttons/ButtonSelect";
import URL_API from "../config/api";

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
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${URL_API}/subject`)
      .then((response) => response.json())
      .then((data) => {
        setSubjects(data);
        setLoading(false);
        console.log("Fetched subjects: ", data);
      })
      .catch((error) => {
        console.error("Error: ", error);
        setLoading(false);
      });
  }, []);

  const uniqueLetters = [
    ...new Set(
      subjects
        .filter((titre) => titre && titre.name)
        .map((titre) => titre.name[0].toUpperCase())
    ),
  ];
  console.log("Unique letters:", uniqueLetters);

  return (
    <>
      <TopNavbar titlesWithLevels={titre} />
      <div className="container">
        <Custom_Sidebar />

        <div className="right-div">
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%"
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              <div className="div-chearch">
                <Typography variant="overline">
                  Tout les cours enseignés par :
                </Typography>

                <InputText
                  label={"Rechercher une matiere"}
                  sx={{ width: "50%" }}
                />
              </div>

              <div className="div-creation">
                <CustomButton
                  label={"Crée un nouveau module"}
                  startIcon={<AddIcon />}
                  variant={"contained"}
                />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="overline">trier par :</Typography>
                  <ButtonSelect
                    options={[
                      "Ordre alphabetique",
                      "Par niveau",
                      "Option 3",
                    ]}
                    placeholder="Sélectionner un module"
                    onChange={(val) => console.log("Tu as choisi :", val)}
                  />
                </div>
              </div>

              <div className="cards-container">
                {uniqueLetters.map((letter, index) => (
                  <div key={index} className="card-wrapper">
                    <CardSubject titles={subjects} letter={letter} />
                    {console.log(letter)}
                  </div>
                ))}
              </div>

              <div className="action-button">
                <CustomButton
                  label="Enregistrer"
                  sx={{ paddingY: 0.5, paddingX: 6 }}
                />

                <CustomButton
                  label="Generer"
                  variant={"contained"}
                  sx={{ paddingY: 0.5, paddingX: 6 }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
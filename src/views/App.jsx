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
import CreateDialog from "../components/CreateDialog";

function App() {
  const [levels, setLevels] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [professors, setProfessors] = useState([]); // État pour les professeurs
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: "", professor_id: "" }); // État pour le nouveau sujet

  useEffect(() => {
    fetch(`${URL_API}/subject`)
      .then((response) => response.json())
      .then((data) => {
        setSubjects(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });

    fetch(`${URL_API}/level`)
      .then((response) => response.json())
      .then((data) => {
        setLevels(data);
      })
      .catch((error) => {
        console.error("Erreur : ", error);
      });

    fetch(`${URL_API}/professor`) // Récupérer les professeurs
      .then((response) => response.json())
      .then((data) => {
        setProfessors(data);
      })
      .catch((error) => {
        console.error("Erreur : ", error);
      });
  });

  const uniqueLetters = [
    ...new Set(
      subjects
        .filter((titre) => titre && titre.name)
        .map((titre) => titre.name[0].toUpperCase())
    ),
  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (field, value) => {
    setNewSubject((prevState) => ({ ...prevState, [field]: value }));
  };

  const addSubject = async () => {
    try {
      const response = await fetch(`${URL_API}/subject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(newSubject),
      });

      if (response.ok) {
        const data = await response.json();
        setSubjects((prevSubjects) => [...prevSubjects, data]);
        setOpen(false);
      } else {
        const errorData = await response.json();
        console.error("Erreur lors de la création de la matière :", errorData);
      }
    } catch (error) {
      console.error("Erreur : ", error);
    }
  };

  return (
    <>
      <TopNavbar levels={levels} />
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
                  onClick={handleOpen}
                />

                <CreateDialog
                  open={open}
                  handleClose={handleClose}
                  titre={"Création de matière"}
                  champs={[
                    { label: "Nom: ", name: "name" },
                    {
                      label: "Professeur",
                      name: "professor_id",
                      type: "select",
                      options: professors.map((p) => ({
                        label: `${p.firstname} ${p.name}`,
                        value: p.id,
                      })),
                    },
                  ]}
                  onInputChange={handleInputChange}
                  onClick={addSubject}
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
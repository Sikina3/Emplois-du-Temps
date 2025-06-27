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
import { useLevels } from "../services/useLevels";
import { useSubjects } from "../services/useSubjects";
import { useNavigate } from "react-router-dom";
import { useProfesseurs } from "../services/useProfesseurs";
import CreateDialog from "../components/CreateDialog";

function App() {
  const {getAll: getAllLevels, create: createLevel} = useLevels();
  const { data: levelData } = getAllLevels();

  const { getAll: getAllSubjects, create: createSubject } = useSubjects();
  const { data: subjects} = getAllSubjects();

  const { getAll: getAllProf } = useProfesseurs();
  const { data: profData } = getAllProf();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: "", professor_id: "" });

  const redirectPage = () => {
    navigate("/modif");
  };

  const uniqueLetters = [
    ...new Set(subjects?.map((titre) => titre?.name?.[0]?.toUpperCase())),
  ].filter(Boolean);

  const handleInputChange = (field, value) => {
    setNewSubject((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleAddSubject = (event) => {
    event.preventDefault();
    createSubject.mutate(newSubject);
    setOpen(false);
    setNewSubject({ name: "", professor_id: "" });
  };
  
  return (
    <>
      <TopNavbar levels={levelData} />
      <div className="container">
        <Custom_Sidebar />

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
              onClick={() => setOpen(true)}
            />
            <CreateDialog
                  open={open}
                  handleClose={() => setOpen(false)}
                  titre={"Création de matière"}
                  champs={[
                    { label: "Nom: ", name: "name" },
                    {
                      label: "Professeur",
                      name: "professor_id",
                      type: "select",
                      options: profData?.map((p) => ({
                        label: `${p.firstname} ${p.name}`,
                        value: p.id,
                      })),
                    },
                  ]}
                  onInputChange={handleInputChange}
                  onClick={handleAddSubject}
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
                <CardSubject titles={subjects} letter={letter} />
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
              sx={{paddingY: 0.5, paddingX: 6}}
              onClick={redirectPage} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

import { useEffect, useState, useMemo } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import { useProfesseurs } from "../services/useProfesseurs";
import CreateDialog from "../components/CreateDialog";

function App() {
  const [currentProfId, setCurrentProfId] = useState(null);
  const [currentAcademicId, setCurrentAcademicId] = useState(null);

  const {getAll: getAllLevels, create: createLevel} = useLevels();
  const { data: levelData } = getAllLevels();

  const subjectService = useSubjects();
  const { getAll: getAllSubjects, create: createSubject} = subjectService;
  const linkSub = subjectService.linkToTrack();
  const { data: subjects} = getAllSubjects();

  const { getAll: getAllProf } = useProfesseurs();
  const { data: profData } = getAllProf();

  const { data: subTrack } = subjectService.getByAcademicTrack(currentAcademicId);

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: "", professor_id: "" });
  const [trackSub, setTrackSub] = useState("");
  const [activeSidebar, setActiveSidebar] = useState("Tout les professeurs");
  const [activeProfId, setprofId] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const profId = searchParams.get("profId");
    const academicId = searchParams.get("academicId");

    setCurrentProfId(profId);
    setCurrentAcademicId(academicId);
  }, [location.search]);

  useEffect(() => {
    const searchParams = new URLSearchParams();
    if (currentProfId) searchParams.set("profId", currentProfId);
    if (currentAcademicId) searchParams.set("academicId", currentAcademicId);

    navigate(`?${searchParams.toString()}`, { replace: true });
  }, [currentProfId, currentAcademicId, navigate]);
  

  const redirectPage = () => {
    navigate("/modif");
  };

  const uniqueLetters = [
    ...new Set(subjects?.map((titre) => titre?.name?.[0]?.toUpperCase())),
  ].filter(Boolean);

  const handleInputChange = (field, value) => {
    if (field === "academic_track_id") {
      setTrackSub(value);
    } else {
      setNewSubject((prev) => ({ ...prev, [field]: value }));
    }
  };  

  function getShortTrack(name) {
    if (name.includes("Informatique")) return "Info";
    if (name.includes("Math")) return "Maths";
    if (name.includes("Genie")) return "Genie";
    if (name.includes("Interaction")) return "Image";
    return name;
  }

  const handleAddSubject = (event) => {
    event.preventDefault();
    createSubject.mutate(newSubject, {
      onSuccess: (data) => {
        if(trackSub && data?.Subject?.id){
          console.log("TOnga eto");
          linkSub.mutate({
            subjectId: data?.Subject?.id,
            trackId: trackSub
          });
          console.log("Ary eto>?>");
        }
      }
    });    
    setOpen(false);
    setNewSubject({ name: "", professor_id: "" });
    setTrackSub("");
  };

  const sidebarButtonClick = (label, professorId) => {
    setActiveSidebar(label);
    setprofId(professorId);
  };

  const subTrackId = currentAcademicId ? subTrack : subjects;
  const filtre = subTrackId?.filter((subject) => {
    const matchProf = activeProfId ? subject.professor_id === activeProfId : true;
    return matchProf ;
  });

  const filteredLetters = uniqueLetters.filter((letter) =>
    filtre?.some((subject) =>
      subject?.name?.toLowerCase().startsWith(letter.toLowerCase())
    )
  );

  return (
    <>
      <TopNavbar 
        levels={levelData}
        onSelectAcademicTrack={(id) => setCurrentAcademicId(id)}
        currentAcademicTrack={currentAcademicId} 
      />
      <div className="container">
        <Custom_Sidebar 
          onButtonClick={(label, professorId) => {
            sidebarButtonClick(label, professorId);
            setCurrentProfId(professorId)
          }}
          currentProfessorId={currentProfId}
        />

        <div className="right-div">
          <div className="div-chearch">
            {/** Place du bar de recherche */}
            <Typography variant="overline">
              Tout les cours enseignés par {activeSidebar && `: ${activeSidebar}`}
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
                    {
                      label: "Parcours",
                      name: "academic_track_id",
                      type: "select",
                      options: levelData?.flatMap((level) =>
                        level.academic_tracks.map((p) => {
                        const short = level.name
                          .replace("Licence", "L")
                          .replace("Master", "M");
                        const suffix = 
                          p.name.toLowerCase() === "tronc commun"
                            ? ""
                            : " " + getShortTrack(p.name);
                        return {
                          label: short + suffix,
                          value: p.id,
                        };
                      })),
                    },
                  ]}
                  onInputChange={handleInputChange}
                  onClick={handleAddSubject}
                  sxSelect={{border: "0.5px solid gray"}}
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
            {filteredLetters.map((letter, index) => (
              <div key={index} className="card-wrapper">
                <CardSubject titles={filtre} letter={letter} />
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

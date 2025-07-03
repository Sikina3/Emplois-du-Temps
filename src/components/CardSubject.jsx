import { useEffect, useState, useRef } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import ButtonSecondary from "./buttons/ButtonSecondary";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useDebouce} from "../hook/useDebouce";
import { useTimetable } from "../services/useTimetable";
import apiService from "../services/apiService";

function CardSubject({ titles, letter, sx, timetableId }) {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [subMenuAnchors, setSubMenuAnchors] = useState({});
  const [subSubMenuAnchors, setSubSubMenuAnchors] = useState({});
  const [openSubSubMenuKey, setOpenSubSubMenuKey] = useState(null);
  const [selectedJour, setSelectedJour] = useState({});
  const [selectedPartie, setSelectedPartie] = useState({});

  const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const parties = ["Matin", "Après-midi"];
  const [checkSubjects, setCheckSubjects] = useState([]);
  const [subjectCounts, setSubjectCounts] = useState({});
  const [activeSubId, setActiveSubId] = useState(null);
  const [activeCourseIndex, setActiveCourseIndex] = useState(null); 
const [activeJourKey, setActiveJourKey] = useState(null); 
const [activePartieKey, setActivePartieKey] = useState(null); 
const debouceCounts = useDebouce(subjectCounts, 800);


  const AddMultipleSub = (id) => {
    setSubjectCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const MinusMultipleSub = (id) => {
    setSubjectCounts((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  const handleCheckBoxChange = (id) => {
    setCheckSubjects((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

    setSubjectCounts((prev) => ({
      ...prev,
      [id]: prev[id] || 1,
    }));
  };

  const handleMenu = (event, subjectId) => {
    setMenuAnchor(event.currentTarget);
    setActiveSubId(subjectId);
    setSubMenuAnchors({}); // reset
    setSubSubMenuAnchors({});
    setOpenSubSubMenuKey(null);
  };

  const handleCloseAll = () => {
    setMenuAnchor(null);
    setSubMenuAnchors({});
    setSubSubMenuAnchors({});
    setOpenSubSubMenuKey(null);
    setActiveCourseIndex(null);
    setActiveJourKey(null);
    setActivePartieKey(null);
  };

  const filtreTitle =
    titles?.filter((subject) =>
      subject?.name?.toLowerCase().startsWith(letter?.toLowerCase())
    ) || [];

    const [alredySave, setAlreadySave] = useState({});
    const saveCountRef = useRef({});

    useEffect(() => {
      const fetchSavedCourses = async () => {
        try {
          const allCourses = await apiService.get("course", { timetable_id: timetableId});
          const counts = {};
    
          allCourses?.forEach(course => {
            const subId = course.subject_id;
            counts[subId] = (counts[subId] || 0) + 1;
          });
    
          saveCountRef.current = counts;
        } catch (err) {
          console.error("Erreur lors de la récupération des cours existants :", err);
        }
      };
    
      if (timetableId) {
        fetchSavedCourses();
      }
    }, [timetableId]);    

    useEffect(() => {
      const saveCourse = async () => {
        for (const subjectId in debouceCounts) {
          const desiredCount = debouceCounts[subjectId];
          const alreadySaved = saveCountRef.current[subjectId] || 0;
    
          const missing = desiredCount - alreadySaved;
    
          if (missing > 0) {
            for (let i = 0; i < missing; i++) {
              try {
                await apiService.create("course", {
                  duration: 1,
                  subject_id: subjectId,
                  timetable_id: timetableId,
                });
    
                saveCountRef.current[subjectId] = alreadySaved + i + 1;
    
              } catch (error) {
                console.error("Erreur lors de l'enregistrement du cours: ", error);
              }
            }
          }
        }
      };
    
      if (timetableId && Object.keys(debouceCounts).length > 0) {
        saveCourse();
      }
    }, [debouceCounts, timetableId]);
    


  return (
    <Card sx={{ maxWidth: 500, marginBottom: 2, ...sx }}>
      <CardHeader
        title={letter?.toUpperCase() || "N"}
        sx={{ backgroundColor: "#A1B4C6", height: 6 }}
        titleTypographyProps={{
          variant: "body2",
          fontSize: 14,
          color: "white",
          fontWeight: "bold",
        }}
      />
      <CardContent sx={{ paddingX: 0.5 }}>
        {filtreTitle.length > 0 ? (
          filtreTitle.map((subject, index) => {
            const isCheck = checkSubjects.includes(subject.id || index);
            const count = subjectCounts[subject.id] || 1;

            const joursChoisis = [];
            for (let i = 0; i < count; i++) {
              const key = `${subject.id}-${i}`;
              if (selectedJour[key]) {
                joursChoisis.push(selectedJour[key]);
              }
            }
            return (
              <ButtonSecondary
                key={subject.id || index}
                startIcon={
                  <Checkbox
                    checked={isCheck}
                    onChange={() =>
                      handleCheckBoxChange(subject.id || index)
                    }
                  />
                }
                label={subject.name}
                endIcon={
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      position: "absolute",
                      right: 16,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    {isCheck && (
                      <>
                        <Box
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <RemoveIcon
                            sx={{
                              fontSize: "16px",
                              backgroundColor: "blueviolet",
                              color: "white",
                              borderRadius: "8px 0 0 8px",
                              cursor: "pointer",
                            }}
                            onClick={() => MinusMultipleSub(subject.id)}
                          />
                          <Typography
                            sx={{
                              fontSize: "12px",
                              backgroundColor: "green",
                              color: "white",
                            }}
                          >
                            {count} fois
                          </Typography>
                          <AddIcon
                            sx={{
                              fontSize: "16px",
                              backgroundColor: "blueviolet",
                              color: "white",
                              height: 18,
                              borderRadius: "0px 8px 8px 0px",
                              cursor: "pointer",
                            }}
                            onClick={() => AddMultipleSub(subject.id)}
                          />
                        </Box>
                        <CalendarMonthIcon
                          sx={{ color: "#555", cursor: "pointer" }}
                          onClick={(e) => handleMenu(e, subject.id)}
                        />
                      </>
                    )}
                    <MoreVertIcon sx={{ color: "#555" }} />
                  </Box>
                }
                sx={{
                  width: "100%",
                  justifyContent: "flex-start",
                  paddingY: "2px",
                  paddingX: 0,
                }}
              />
            );
          })
        ) : (
          <Typography variant="body2" color="textSecondary">
            Aucun titre disponible
          </Typography>
        )}
      </CardContent>

      {/* Menu principal */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleCloseAll}
      >
        {[...Array(subjectCounts[activeSubId] || 1)].map((_, index) => (
          <MenuItem
            key={index}
            selected={activeCourseIndex === index}
            onClick={(e) => {
              const anchor = e.currentTarget;
              setActiveCourseIndex(index);
              if (anchor) {
                setSubMenuAnchors((prev) => ({
                  ...prev,
                  [index]: anchor,
                }));
                setOpenSubSubMenuKey(null);
              }
            }}
            onMouseLeave={() =>
              setSubMenuAnchors((prev) => ({ ...prev, [index]: null }))
            }
          >
            Cours {index + 1}

            {/* Sous menu */}
            <Menu
              anchorEl={subMenuAnchors[index]}
              open={Boolean(subMenuAnchors[index])}
              onClose={handleCloseAll}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              <MenuItem
                selected={activeJourKey === `${index}-jour`}
                onMouseEnter={(e) => {
                  setSubSubMenuAnchors((prev) => ({
                    ...prev,
                    [`${index}-jour`]: e.currentTarget,
                  }));
                  setOpenSubSubMenuKey(`${index}-jour`);
                }}
                onMouseLeave={() => setOpenSubSubMenuKey(null)}
              >
                Jour
                <Menu
                  anchorEl={subSubMenuAnchors[`${index}-jour`]}
                  open={openSubSubMenuKey === `${index}-jour`}
                  onClose={handleCloseAll}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
                >
                  {jours.map((j, i) => (
                    <MenuItem 
                      key={i} 
                      onClick={() => {
                        setSelectedJour(prev => ({
                          ...prev,
                          [`${activeSubId}-${activeCourseIndex}`]: j,
                        }));
                        console.log("Le id: ", activeSubId);
                        handleCloseAll();
                      }}
                    >
                      {j}
                    </MenuItem>
                  ))}
                </Menu>
              </MenuItem>

              <MenuItem
              selected={activePartieKey === `${index}-partie`}
                onMouseEnter={(e) => {
                  setSubSubMenuAnchors((prev) => ({
                    ...prev,
                    [`${index}-partie`]: e.currentTarget,
                  }));
                  setOpenSubSubMenuKey(`${index}-partie`);
                }}
                onMouseLeave={() => setOpenSubSubMenuKey(null)}
              >
                Partie
                <Menu
                  anchorEl={subSubMenuAnchors[`${index}-partie`]}
                  open={openSubSubMenuKey === `${index}-partie`}
                  onClose={handleCloseAll}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
                >
                  {parties.map((p, i) => (
                    <MenuItem key={i} onClick={handleCloseAll}>
                      {p}
                    </MenuItem>
                  ))}
                </Menu>
              </MenuItem>
            </Menu>
          </MenuItem>
        ))}
      </Menu>
    </Card>
  );
}

export default CardSubject;

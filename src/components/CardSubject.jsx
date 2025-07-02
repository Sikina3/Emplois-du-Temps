import { useState } from "react";
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

function CardSubject({ titles, letter, sx }) {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [subMenuAnchors, setSubMenuAnchors] = useState({});
  const [subSubMenuAnchors, setSubSubMenuAnchors] = useState({});
  const [openSubSubMenuKey, setOpenSubSubMenuKey] = useState(null);

  const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const parties = ["Matin", "Après-midi"];
  const [checkSubjects, setCheckSubjects] = useState([]);
  const [subjectCounts, setSubjectCounts] = useState({});
  const [activeSubId, setActiveSubId] = useState(null);

  const AddMultipleSub = (id) => {
    setSubjectCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const MinusMultipleSub = (id) => {
    setSubjectCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) - 1,
    }));
  }

  const handleCheckBoxChange= (id) => {
    setCheckSubjects((prev) => 
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const handleMenu = (event, subjectId) => {
    setMenuAnchor(event.currentTarget);
    setActiveSubId(subjectId);
  };

  const handleCloseAll = () => {
    setMenuAnchor(null);
    setSubMenuAnchors({});
    setSubSubMenuAnchors({});
    setOpenSubSubMenuKey(null);
  };

  const filtreTitle = titles?.filter((subject) =>
    subject?.name?.toLowerCase().startsWith(letter?.toLowerCase())
  ) || [];

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
        {filtreTitle?.length > 0 ? (
          filtreTitle?.map((subject, index) => {
            const isCheck = checkSubjects.includes(subject.id || index); 
            const count = subjectCounts[subject.id] || 1;
            return(
            <ButtonSecondary
              key={subject.id || index}
              startIcon={<Checkbox
                  checked={isCheck}
                  onChange={() => handleCheckBoxChange(subject.id || index)}
                />}
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
                      <Box sx={{display: "flex",alignItems: "center"}}>
                        <RemoveIcon sx={{fontSize: "16px", backgroundColor: "blueviolet", color: "white", borderRadius: "8px 0 0 8px"}} onClick={() => MinusMultipleSub(subject.id)}/>
                        <Typography sx={{fontSize: "12px", backgroundColor: "green", color: "white"}}> {count} fois </Typography>
                        <AddIcon sx={{fontSize: "16px", backgroundColor: "blueviolet", color: "white", borderRadius: "0px 8px 8px 0px"}} onClick={() =>AddMultipleSub(subject.id)}/>
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
          )})
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
        {[...Array(subjectCounts[activeSubId] || 1)].map((_, index) =>(
          <MenuItem
            key={index}
            onMouseEnter={(e) =>
              setSubMenuAnchors((prev) => ({ ...prev, [index]: e.currentTarget }))
            }
            onMouseLeave={() =>
              setSubMenuAnchors((prev) => ({ ...prev, [index]: null }))
            }
          >
            Cours {index + 1}

            {/* Sous menu 1  */}
            <Menu
              anchorEl={subMenuAnchors[index]}
              open={Boolean(subMenuAnchors[index])}
              onClose={handleCloseAll}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              <MenuItem
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
                    <MenuItem key={i} onClick={handleCloseAll}>
                      {j}
                    </MenuItem>
                  ))}
                </Menu>
              </MenuItem>

              <MenuItem
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

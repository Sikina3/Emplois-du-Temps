import { Box, Divider, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ButtonSecondary from "../buttons/ButtonSecondary";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import URL_API from "../../config/api";

function getShortTrack(name) {
    if (name.includes("Informatique")) return "Info";
    if (name.includes("Math")) return "Maths";
    if (name.includes("Genie")) return "Genie";
    if (name.includes("Interaction")) return "Image";
    return name;
  }
  

function Right_sidebar() {
  const [levels, setLevels] = useState([]);
  const [activeButton, setActiveButton] = useState("");

  const handleButtonClick = (label) => {
    setActiveButton(label);
  };

  useEffect(() => {
    fetch(`${URL_API}/level`)
      .then((response) => response.json())
      .then((data) => {
        setLevels(data);
      })
      .catch((error) => {
        console.error("Erreur : ", error);
      });
  }, []);

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
    >
      <Box sx={{ display: "flex", padding: 1 }}>
        <FilterListIcon />
        <Typography
          variant="h6"
          component="h2"
          sx={{ fontWeight: "bold", marginLeft: 2 }}
        >
          Niveau
        </Typography>
      </Box>

      <Divider />

      <Box
        sx={{
          marginTop: 10,
          height: "calc(100vh - 200px)",
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
        {levels
          .flatMap((level) =>
            level.academic_tracks.map((track) => {
              const shortName = level.name
                .replace("Licence", "L")
                .replace("Master", "M");

              const suffix =
                track.name.toLowerCase() === "tronc commun"
                  ? ""
                  : " " + getShortTrack(track.name); 

              return {
                id: track.id,
                label: shortName + suffix,
              };
            })
          )
          .map((item) => (
            <ButtonSecondary
              key={item.id}
              label={item.label}
              variant={"contained"}
              sx={{
                width: "100%",
                fontSize: "16px",
                justifyContent: "space-between",
              }}
              isActive={activeButton === item.id}
              onClick={() => handleButtonClick(item.id)}
              endIcon={<MoreVertIcon />}
            />
          ))}
      </Box>
    </Box>
  );
}

export default Right_sidebar;

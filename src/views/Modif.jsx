import { Box, Icon } from "@mui/material";
import Right_sidebar from "../components/navigations/RightSidebar";
import CustomButton from "../components/buttons/CustomButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import "../styles/modif.css";
import HelpIcon from "@mui/icons-material/Help";
import { useNavigate } from "react-router-dom";
import { useNextWeek} from "../hook/useNextWeek";

function Modif() {
  const navigate = useNavigate();
  const {timetableId, nextMonday} = useNextWeek();

  const redirectPage = () => {
    navigate("/");
  };

  const formatDate = (d) => {
    const date = new Date(d);
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="container">
        <Box className="left-div">
          <Box>
            <CustomButton
              label="Revenir en arrière pour continuer la création"
              startIcon={<ChevronLeftIcon />}
              onClick={redirectPage}
            />
          </Box>

          <Box className="instruction-box">
            <HelpIcon sx={{ width: 80, height: 80, color: "#5FC2BA" }} />
            <Box sx={{ flex: 1, alignContent: "center" }}>
              <p>
                Pour finaliser la création de l’emploi du temps du{" "}
                <span className="date">{formatDate(nextMonday) }</span>, vous pouvez
                supprimer ou déplacer des cours dans d’autres salles ou d’autres
                jours.
              </p>
              <br></br>
              <p>
                Appuyez sur le bouton{" "}
                <span className="link-purple">‘Télécharger en Excel’</span> pour
                télécharger la version finale, ou{" "}
                <span className="link-red">supprimer</span> pour supprimer
                l’emploi du temps.
              </p>
            </Box>
          </Box>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Horaire</th>
                <th>Éléments Constitutifs</th>
                <th>Salle</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: "Lundi-17", horaires: ["8h–12h", "14h–18h"] },
                { date: "Mardi-18", horaires: ["14h–18h"] },
                { date: "Mercredi-19", horaires: ["14h–18h"] },
                { date: "Jeudi-20", horaires: ["8h–12h", "14h–18h"] },
                { date: "Vendredi-21", horaires: ["14h–18h"] },
              ].map(({ date, horaires }, i) =>
                horaires.map((horaire, j) => (
                  <tr key={`${date}-${horaire}`}>
                    {j === 0 && <td rowSpan={horaires.length}>{date}</td>}
                    <td>{horaire}</td>
                    <td>Anglais</td>
                    <td>Confimia</td>
                    <td>
                      <span className="action-red">Supprimer</span> |{" "}
                      <span className="action-purple">Déplacer à</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <Box className="action-buttons">
            <CustomButton label="Supprimer" color="error" variant="outlined" />
            <CustomButton
              label="Télécharger en Excel"
              color="primary"
              variant="contained"
            />
          </Box>
        </Box>
        <Right_sidebar />
      </div>
    </>
  );
}

export default Modif;

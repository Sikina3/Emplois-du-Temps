import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Typography,
} from "@mui/material";
import ButtonSecondary from "./buttons/ButtonSecondary";

function CardSubject({ titles, letter, sx }) {
  
  const filtreTitle = titles?.filter((subject) =>
    subject?.name?.toLowerCase().startsWith(letter?.toLowerCase())
  ) || [];

  return (
    <Card sx={{ maxWidth: 300, marginBottom: 2, ...sx }}>
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
      <CardContent>
        {filtreTitle.length > 0 ? (
          filtreTitle.map((subject, index) => (
            <ButtonSecondary
              key={subject.id || index}
              startIcon={<Checkbox />}
              label={subject.name}
              endIcon={
                <MoreVertIcon
                  sx={{
                    position: "absolute",
                    right: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                />
              }
              sx={{ width: "100%", justifyContent: "flex-start", paddingY: "2px" }}
            />
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            Aucun titre disponible
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default CardSubject;
import { Button } from "@mui/material";

function ButtonSecondary({ label, width, height, variant, startIcon, endIcon, sx, isActive, onClick }) {
  return (
    <Button
      variant={variant}
      onClick={onClick}
        sx={{
        width: width, 
        height: height,
        borderRadius: 0,
        textTransform: "none",
        backgroundColor: isActive ? "#FFFFFF" : variant === "contained" ? "#3B556D" : "#FFFFFF",
        color: isActive ? "#3B556D" : variant === "contained" ? "#FFFFFF" : "#3B556D",
        boxShadow: "none",
        border: "none",
        "&:hover": {
            backgroundColor: isActive ? "#f0f0f0" : variant === "contained" ? "#162336" : "#f0f0f0",
          boxShadow: "none"
        },
        paddingX: 2,
        paddingY: 1.5,
        ...sx,
      }}
      startIcon={startIcon}
      endIcon={endIcon}
    >
      {label}
    </Button>
  );
}

export default ButtonSecondary;

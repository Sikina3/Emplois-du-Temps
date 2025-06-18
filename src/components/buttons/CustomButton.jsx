import { Button } from "@mui/material";

function CustomButton({ label, width, height, variant, startIcon, endIcon }) {
  return (
    <Button
      variant={variant}
      sx={{
        width: width, 
        height: height,
        borderRadius: 0,
        textTransform: "none",
        backgroundColor: variant === "contained" ? "#1C2942" : "#FFFFFF",
        color: variant === "contained" ? "#FFFFFF" : "#1C2942",
        boxShadow: "none",
        border: "1px solid #1C2942",
        "&:hover": {
          backgroundColor: variant === "contained" ? "#162336" : "#f0f0f0",
          boxShadow: "none"
        },
        paddingX: 2,
        paddingY: 1.5
      }}
      startIcon={startIcon}
      endIcon={endIcon}
    >
      {label}
    </Button>
  );
}

export default CustomButton;

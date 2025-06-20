import { TextField } from "@mui/material";

function InputText({label, sx, value}){
    return (
        <>
        <TextField
        placeholder= {label}
        variant="outlined"
        value={value}
        InputLabelProps={{ shrink: false }} 
        sx={{
          backgroundColor: "#fff",
          input: { color: "black", fontSize: "14px" }, 
          "& .MuiOutlinedInput-root": {
            borderRadius: "0px", 
          },
          ...sx
        }}
      />
        </>
    );
}

export default InputText;
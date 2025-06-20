import { TextField } from "@mui/material";

function InputText({label}){
    return (
        <>
        <TextField
        placeholder= {label}
        variant="outlined"
        InputLabelProps={{ shrink: false }} 
        sx={{
          backgroundColor: "#f0f0f0",
          input: { color: "black", fontSize: "14px" }, 
        }}
        fullWidth
      />
        </>
    );
}

export default InputText;
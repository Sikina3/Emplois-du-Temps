import { TextField } from "@mui/material";

function InputText({label, sx, value, onChange}){
    return (
        <>
        <TextField
        placeholder= {label}
        variant="outlined"
        value={value}
        onChange={onChange}
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
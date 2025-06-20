import { FormControl, MenuItem, Select } from "@mui/material";
import { useState } from "react";

function ButtonSelect({ options = [], placeholder = "Choisir...", onChange }) {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    if (onChange) onChange(event.target.value);
  };

  return (
    <FormControl sx={{minWidth: "200px"}}>
      <Select
        value={value}
        onChange={handleChange}
        displayEmpty
        variant="outlined"
        sx={{
          borderRadius: 0,
          backgroundColor: "transparent",
          fontSize: "14px",
          "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: 0,
          border: "none"
          },
        }}
        inputProps={{
          sx: { padding: "10px" },
        }}
        renderValue={(selected) =>
          selected ? selected : <span style={{ color: "#aaa" }}>{placeholder}</span>
        }
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default ButtonSelect;

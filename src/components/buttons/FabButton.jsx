import AddIcon from '@mui/icons-material/Add';
import { Box, Fab } from "@mui/material";

function FabButton({ size , sx, onClick}) {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Fab 
                size={size} 
                aria-label="add" 
                onClick={onClick}
                sx={{ 
                    backgroundColor: "#5FC2BA", 
                    color: "white", 
                    minHeight: "36px", 
                    minWidth: "36px",
                    ...sx
                }}
            >
                <AddIcon />
            </Fab>
        </Box>
    );
}

export default FabButton;
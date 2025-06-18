import AddIcon from '@mui/icons-material/Add';
import { Box, Fab } from "@mui/material";

function FabButton({size}) {
    return (
        <Box sx={{'& > :not(style)': {m: 1}}}>
            <Fab size={size} aria-label="add" sx={{backgroundColor: "#5FC2BA", color: "white"}}>
                <AddIcon/>
            </Fab>
        </Box>
    );
}

export default FabButton;
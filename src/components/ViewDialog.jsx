import { Dialog, DialogTitle, DialogContent, IconButton, Table, TableHead, TableRow, TableCell, TableBody, DialogActions } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomButton from './buttons/CustomButton';
import EditIcon from "@mui/icons-material/Edit"; 

export default function ViewDialog({modifie, ondelete, handleClose, open, salles}){
    return(
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle> Liste des salles </DialogTitle>
            <DialogContent sx={{width: "600px"}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nom de Salle</TableCell>
                            <TableCell> Capacité </TableCell>
                            <TableCell> Assigné à </TableCell>
                            <TableCell> Actions </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {salles.map((salle, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {salle.nom}
                                </TableCell>
                                <TableCell>
                                    {salle.capacite}
                                </TableCell>
                                <TableCell>
                                    {salle.assigne}
                                </TableCell>
                                <TableCell>
                                    <IconButton>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </DialogContent>
            <DialogActions>
                    <CustomButton 
                        label={"Ajouter"} 
                        variant={"contained"}
                        sx={{ width: "100%"}}/>
            </DialogActions>
        </Dialog>
    );
}
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TableContainer,
  Paper,
  IconButton,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TablePagination from "@mui/material/TablePagination";
import CustomButton from "./buttons/CustomButton";
import EditIcon from "@mui/icons-material/Edit";

export default function ViewDialog({
  modifie,
  ondelete,
  handleClose,
  open,
  salles,
  openCreateDialog
}) {  
  const [rowPer, setRowPer] = useState(5);
  const [page, setPage] = useState(0);
  const ChangePage = (event, newPage) => setPage(newPage);

  const ChangeROwPer = (event) => {
    setRowPer(parseInt(event.target.value, 10));
    setPage(0);
  }; 

  const handleDelete = (id) => {
    deleteData(id);
    setRows(salles.filter((salle) => salle.id !== id));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle> Liste des salles </DialogTitle>
      <DialogContent sx={{ width: "600px" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>
                  Capacité
                </TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salles?.slice(page * rowPer, page * rowPer + rowPer)
                .map((salle, index) => (
                  <TableRow key={salle.id || index}>
                    <TableCell sx={{minWidth: 200}}>{salle.name}</TableCell>
                    <TableCell>{salle.capacity}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(salle.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        color="success"
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={salles?.length}
          rowsPerPage={rowPer}
          page={page}
          onPageChange={ChangePage}
          onRowsPerPageChange={ChangeROwPer}
        />
      </DialogContent>
      <DialogActions>
        <CustomButton
          label={"Ajouter"}
          variant={"contained"}
          sx={{ width: "100%" }}
          onClick={openCreateDialog}
        />
      </DialogActions>
    </Dialog>
    
  );
}

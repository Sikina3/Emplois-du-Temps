import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Fab
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import TablePagination from "@mui/material/TablePagination";

const Level = () => {
  const [rows, setRows] = useState(() => {
    const saveData = localStorage.getItem("Niveau");
    return saveData ? JSON.parse(saveData) : [];
  });

  useEffect(() => {
    localStorage.setItem("Niveau", JSON.stringify(rows));
  }, [rows]);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", studentNumber: "", classRoom: ""});
  const [page, setPage] = useState(0);
  const [rowPer, setRowPer] = useState(5);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const ChangePage = (event, newPage) => setPage(newPage);
  const ChangeROwPer = (event) => {
    setRowPer(parseInt(event.target.value, 10));
    setPage(0);
  };  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (formData.name && formData.studentNumber && formData.classRoom) {
      setRows([...rows, { ...formData, id: rows.length + 1 }]);
      setFormData({ name: "", studentNumber: "", classRoom: ""});
      handleClose();
    }
  };

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  return (
    <Box sx={{ width: "100%", p: 4 }}>
      <Typography variant="h6" gutterBottom style={{marginBottom: 50}}>
        Liste des Niveau Existants
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Nombre d'etudiants</TableCell>
              <TableCell>Salle</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page* rowPer, page * rowPer + rowPer).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.studentNumber}</TableCell>
                <TableCell>{row.classRoom}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDelete(row.id)}>
                    <DeleteIcon />
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
          count={rows.length}
          rowsPerPage={rowPer}
          page={page}
          onPageChange={ChangePage}
          onRowsPerPageChange={ChangeROwPer}
        />
      
      <Fab color="primary" sx={{ position: "fixed", bottom: 16, right: 16 }} onClick={handleOpen}>
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ajouter un Niveau</DialogTitle>
        <DialogContent>
          <TextField label="Nom" name="name" fullWidth margin="dense" onChange={handleChange} value={formData.name} />
          <TextField label="Nombre d'Etudiants" name="studentNumber" fullWidth margin="dense" onChange={handleChange} value={formData.studentNumber} />
          <TextField label="Salle" name="classRoom" fullWidth margin="dense" onChange={handleChange} value={formData.classRoom} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">Annuler</Button>
          <Button onClick={handleAdd} color="primary">Ajouter</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Level;

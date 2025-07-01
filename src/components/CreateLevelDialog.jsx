import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, styled } from "@mui/material";
import { Fragment, useState } from "react";
import InputText from './InputText';
import CustomButton from './buttons/CustomButton';
import { useAcademicTrack } from "../services/useAcademicTrack";
import ButtonSelect from './buttons/ButtonSelect';
import AddIcon from '@mui/icons-material/Add';

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function CreateLevelDialog({levels, close, open, titre}){
    const [parcoursList, setList] = useState([""]);
    const [tracks, setNewTracks] = useState([{name: "", studentsNumber: "", level_id: ""}]);
    const {create} = useAcademicTrack();

    const handleAdd = (event) => {
        event.preventDefault();
    
        tracks.forEach(track => {
            const data = {
                name: track.name,
                studentsNumber: track.studentsNumber,
                level_id: track.level_id
            };
            create.mutate(data); 
        });
    
        setNewTracks([{name: "", studentsNumber: "", level_id: ""}]);
        close();
    }    

    const handleInputChange = (index, field, value) => {
        setNewTracks((prevTracks) => {
            const updatedTracks = [...prevTracks];
            updatedTracks[index][field] = value; 
            return updatedTracks;
        });
    };
    
    const addTrack = () => {
        setList((prevList) => [...prevList, ""]); 
        setNewTracks((prevTracks) => [...prevTracks, { name: "", studentsNumber: "", level_id: tracks[0]?.level_id || "" }]); 
    };

    return (
        <Fragment>
            <BootstrapDialog
                onClose={close}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{m: 0, p: 2, backgroundColor: "#A1B4C6", color: "white"}} id="customized-dialog-title">
                    {titre}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={close}
                    sx={(theme) => ({
                      position: 'absolute',
                      right: 8,
                      top: 8,
                      color: "white",
                    })}
                >
                    <CloseIcon/>
                </IconButton>
                <DialogContent dividers sx={{width: "600px"}}>
                    <ButtonSelect
                        key={"Level"}
                        placeholder={"Niveau"}
                        sx={{width: "100%", border: "0.5px solid gray", marginBottom: 1.5}}
                        options={levels?.map((level) => ({
                            label: level.name,
                            value: level.id
                        }))}
                        onChange={(val) => handleInputChange(0, "level_id", val)}
                    />

                    {parcoursList?.map((value, index) => (
                        <Box key={index} mb={2}>
                            <InputText
                                label={`Parcours ${index + 1}`}
                                onChange={(e) => {
                                    handleInputChange(index, "name", e.target.value)
                                }}                            
                                sx={{marginBottom: 1.5, width: "48%"}}
                            />
                            <InputText
                                label={"Nombre etudiant"}
                                onChange={(e) => {
                                    handleInputChange(index, "studentsNumber", e.target.value)
                                }}                            
                                sx={{marginLeft: 1.5, width: "48%"}}
                            />
                        </Box>
                    ))}

                    <CustomButton
                        variant="outlined"
                        onClick={addTrack}
                        sx={{ marginBottom: 2, fontSize: 12 }}
                        label={"Autre parcours"}
                        startIcon={<AddIcon/>}
                    />
                </DialogContent>
                <DialogActions>
                    <CustomButton
                        label={"Ajouter"}
                        variant={"contained"}
                        sx={{paddingX: 10, paddingY: 1}}
                        onClick={handleAdd}
                    />
                </DialogActions>
            </BootstrapDialog>
        </Fragment>
    )
}
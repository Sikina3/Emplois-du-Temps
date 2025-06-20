import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import InputText from './InputText';
import CustomButton from './buttons/CustomButton';

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function CreateDialog({handleClose, open, titre, onClick, champs})  {
    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{m: 0, p: 2, backgroundColor: "#A1B4C6", color: "white"}} id="customized-dialog-title">
                    {titre}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                      position: 'absolute',
                      right: 8,
                      top: 8,
                      color: "white",
                    })}
                >
                    <CloseIcon/>
                </IconButton>
                <DialogContent dividers sx={{width: "600px",}}>
                    {champs.map((champ) => (
                        <InputText 
                            label={champ.name}
                            sx={{width: "100%", marginBottom: 1.5}}/>
                    ))}
                </DialogContent>
                <DialogActions>
                    <CustomButton 
                        label={"Ajouter"} 
                        variant={"contained"}
                        sx={{paddingX: 10, paddingY: 1}}/>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}
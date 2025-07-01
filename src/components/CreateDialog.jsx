import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import InputText from './InputText';
import CustomButton from './buttons/CustomButton';
import ButtonSelect from './buttons/ButtonSelect';

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function CreateDialog({ handleClose, open, titre, onClick, champs, onInputChange, sxSelect })  {
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
                    {champs?.map((champ) => {
                        const champType = champ.type || "text";

                        if(champType === "select"){
                            return(
                                <ButtonSelect
                                    key={champ.name}
                                    options={champ.options || []}
                                    placeholder={champ.label}
                                    onChange={(val) => onInputChange(champ.name, val)}
                                    sx={{...sxSelect}}
                                />
                            );
                        }
                         return (
                            <InputText 
                                key={champ.name}
                                label={champ.label}
                                sx={{width: "100%", marginBottom: 1.5}}
                                onChange={(e) => {
                                    onInputChange(champ.name, e.target.value)
                                }}
                            />
                        );
                    })}
                </DialogContent>
                <DialogActions>
                    <CustomButton 
                        label={"Ajouter"} 
                        variant={"contained"}
                        sx={{paddingX: 10, paddingY: 1}}
                        onClick={onClick}
                    />
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}
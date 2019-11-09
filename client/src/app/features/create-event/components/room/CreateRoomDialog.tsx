import * as React from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, DialogActions, Fab, Typography, InputAdornment, styled } from '@material-ui/core';
import CustomTextField from '../../../../components/CustomTextField';
import PersonIcon from '@material-ui/icons/Person';

const CapacityTextField = styled(CustomTextField)(({ theme }) => ({
    width: theme.spacing(8) * 2
}));

const CreateRoomActions = styled(DialogActions)(({ theme }) => ({
    padding: theme.spacing(3)
}));

const CreateButton = styled(Fab)({
    width: '100% !important'
});

const CreateRoomDialog: React.FC<DialogProps> = (props) => {

    return (
        <Dialog {...props} fullWidth>
            <DialogTitle>Add Room</DialogTitle>
            <DialogContent>
                <CustomTextField
                    fullWidth
                    label='Room Name'
                    margin='normal'
                />
                <CapacityTextField
                    fullWidth
                    type='number'
                    label='Capacity'
                    margin='normal'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <PersonIcon color='action' />
                            </InputAdornment>
                        )
                    }}
                />
            </DialogContent>
            <CreateRoomActions>
                <CreateButton
                    variant='extended'
                    size='medium'
                    color='primary'
                >
                    add room
                </CreateButton>
            </CreateRoomActions>
        </Dialog>
    )
}

export default CreateRoomDialog;
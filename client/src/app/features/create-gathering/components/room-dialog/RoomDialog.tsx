import * as React from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, DialogActions, Fab, Typography, InputAdornment, styled } from '@material-ui/core';
import CustomTextField from '../../../../components/CustomTextField';
import PersonIcon from '@material-ui/icons/Person';
import { Room } from '../../../../../../../shared/types';
import uuid from 'uuid';

const CapacityTextField = styled(CustomTextField)(({ theme }) => ({
    width: theme.spacing(8) * 2
}));

const CreateRoomActions = styled(DialogActions)(({ theme }) => ({
    padding: theme.spacing(3)
}));

const CreateButton = styled(Fab)({
    width: '100% !important'
});

interface IProps {
    onAddRoom: (room: Room) => void;
}

const RoomDialog: React.FC<IProps & DialogProps> = ({ onAddRoom, ...props }) => {
    const [name, setName] = React.useState('');
    const onChangeName = React.useCallback(e => setName(e.target.value), []);

    const [capacity, setCapacity] = React.useState(10);
    const onChangeCapacity = React.useCallback(e => setCapacity(Number(e.target.value)), []);

    const onSubmit = React.useCallback((e) => {
        onAddRoom({
            name,
            capacity,
            id: uuid.v4()
        });
        setName('');
        setCapacity('');
        props.onClose(e, 'backdropClick');
    }, [name, capacity]);

    return (
        <Dialog {...props} fullWidth>
            <DialogTitle>Add Room</DialogTitle>
            <DialogContent>
                <CustomTextField
                    fullWidth
                    label='Room Name'
                    margin='normal'
                    value={name}
                    onChange={onChangeName}
                />
                <CapacityTextField
                    fullWidth
                    type='number'
                    label='Capacity'
                    margin='normal'
                    value={capacity}
                    onChange={onChangeCapacity}
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
                    onClick={onSubmit}
                >
                    add room
                </CreateButton>
            </CreateRoomActions>
        </Dialog>
    )
}

export default RoomDialog;
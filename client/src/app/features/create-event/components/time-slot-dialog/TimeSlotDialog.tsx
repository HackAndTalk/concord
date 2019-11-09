import * as React from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, DialogActions, Fab, styled } from '@material-ui/core';
import { TimePicker } from '@material-ui/pickers';
import moment from 'moment';

const CreateRoomActions = styled(DialogActions)(({ theme }) => ({
    padding: theme.spacing(3)
}));

const CreateButton = styled(Fab)({
    width: '100% !important'
});

const TimeSlotDialog: React.FC<DialogProps> = (props) => {
    const [start, setStart] = React.useState(new Date());
    const [end, setEnd] = React.useState(moment().add(1, 'hour').toDate());

    return (
        <Dialog {...props} fullWidth>
            <DialogTitle>Add Time Slot</DialogTitle>
            <DialogContent>
                <TimePicker 
                    onChange={setStart}
                    value={start}
                    inputVariant='outlined'
                    margin='normal'
                />
                <TimePicker 
                    onChange={setEnd}
                    value={end}
                    inputVariant='outlined'
                    margin='normal'
                />
            </DialogContent>
            <CreateRoomActions>
                <CreateButton
                    variant='extended'
                    size='medium'
                    color='primary'
                >
                    add time slot
                </CreateButton>
            </CreateRoomActions>
        </Dialog>
    )
}

export default TimeSlotDialog;
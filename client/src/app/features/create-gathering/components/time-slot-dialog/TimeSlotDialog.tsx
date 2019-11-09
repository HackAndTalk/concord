import * as React from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, DialogActions, Fab, styled } from '@material-ui/core';
import { TimePicker } from '@material-ui/pickers';
import moment from 'moment';
import { TimeSlot } from '../../../../../../../shared/types';
import uuid from 'uuid';

const CreateRoomActions = styled(DialogActions)(({ theme }) => ({
    padding: theme.spacing(3)
}));

const CreateButton = styled(Fab)({
    width: '100% !important'
});

interface IProps {
    onAddTimeSlot: (timeSlot: TimeSlot) => void;
}

const TimeSlotDialog: React.FC<IProps & DialogProps> = ({ onAddTimeSlot, ...props }) => {
    const [startTime, setStartTime] = React.useState(new Date());
    const [endTime, setEndTime] = React.useState(moment().add(1, 'hour').toDate());

    const onSubmit = React.useCallback((e) => {
        onAddTimeSlot({
            startTime,
            endTime,
            id: uuid.v4()
        });
        setStartTime(new Date());
        setEndTime(moment().add(1, 'hour').toDate())
        props.onClose(e, 'backdropClick');
    }, [startTime, endTime]);

    return (
        <Dialog {...props} fullWidth>
            <DialogTitle>Add Time Slot</DialogTitle>
            <DialogContent>
                <TimePicker
                    onChange={setStartTime}
                    value={startTime}
                    inputVariant='outlined'
                    margin='normal'
                />
                <TimePicker
                    onChange={setEndTime}
                    value={endTime}
                    inputVariant='outlined'
                    margin='normal'
                />
            </DialogContent>
            <CreateRoomActions>
                <CreateButton
                    variant='extended'
                    size='medium'
                    color='primary'
                    onClick={onSubmit}
                >
                    add time slot
                </CreateButton>
            </CreateRoomActions>
        </Dialog>
    )
}

export default TimeSlotDialog;
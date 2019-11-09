import * as React from 'react';
import Title from '../../components/PageTitle';
import { Typography, styled, Fab, Button, Table, TableBody } from '@material-ui/core';
import CustomTextField from '../../components/CustomTextField';
import Room from './components/room/Room';
import RoomDialog from './components/room-dialog/RoomDialog';
import moment from 'moment';
import Timeslot from './components/time-slot/Timeslot';
import TimeSlotDialog from './components/time-slot-dialog/TimeSlotDialog';
import FixedFabPageContainer from '../../components/FixedFabPageContainer';
import FixedFab from '../../components/FixedFab';
import { createGathering } from '../active-gathering/gathering-api';
import { useUserId } from '../../hooks';
import { Room as RoomType, TimeSlot as TimeSlotType } from '../../../../../shared/types';

const Section = styled('div')(({ theme }) => ({
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
}));

const timeSlots = [
    {
        start: moment('9.11.19 13:00').toDate(),
        end: moment('9.11.19 14:00').toDate()
    },
    {
        start: moment('9.11.19 13:00').toDate(),
        end: moment('9.11.19 14:00').toDate()
    },
    {
        start: moment('9.11.19 13:00').toDate(),
        end: moment('9.11.19 14:00').toDate()
    }
]

const CreateGathering: React.FC = () => {

    const [rooms, setRooms] = React.useState<RoomType[]>([]);
    const [showRoomDialog, setShowRoomDialog] = React.useState(false);
    const openRoomDialog = React.useCallback(() => setShowRoomDialog(true), []);
    const closeRoomDialog = React.useCallback(() => setShowRoomDialog(false), []);
    const addRoom = React.useCallback((room: RoomType) => setRooms(rooms.concat(room)), [rooms]);
    const deleteRoom = React.useCallback((room: RoomType) => setRooms(rooms.filter(r => r !== room)), [rooms]);

    const [timeSlots, setTimeSlots] = React.useState<TimeSlotType[]>([]);
    const [showTimeSlotDialog, setShowTimeSlotDialog] = React.useState(false);
    const openTimeSlotDialog = React.useCallback(() => setShowTimeSlotDialog(true), []);
    const closeTimeSlotDialog = React.useCallback(() => setShowTimeSlotDialog(false), []);
    const addTimeSlot = React.useCallback((timeSlot: TimeSlotType) => setTimeSlots(timeSlots.concat(timeSlot)), []);
    const deleteTimeSlot = React.useCallback((timeSlot: TimeSlotType) => setTimeSlots(timeSlots.filter(t => t !== timeSlot)), []);

    const [name, setName] = React.useState('');
    const onChangeName = React.useCallback(e => setName(e.target.value), []);

    const [title, setTitle] = React.useState('');
    const onChangeTitle = React.useCallback(e => setTitle(e.target.value), []);

    const userId = useUserId();

    const onSubmit = React.useCallback(async () => {
        const id = await createGathering(userId, name, {
            title,
            rooms,
            timeSlots
        });

        window.location.pathname = id;
    }, [userId, name, title, rooms, timeSlots]);

    return (
        <FixedFabPageContainer>
            <Title variant='h6'>
                Create Event
            </Title>
            <CustomTextField
                fullWidth
                placeholder='Event Name'
                margin='normal'
                value={title}
                onChange={onChangeTitle}
            />
            <CustomTextField
                fullWidth
                placeholder='Your Name'
                margin='normal'
                value={name}
                onChange={onChangeName}
            />

            {/* ROOMS */}
            <Section>
                <Typography variant='subtitle2'>
                    ROOMS
                </Typography>
                <Table>
                    <TableBody>
                        {rooms.map((room) => (
                            <Room
                                key={room.id}
                                name={room.name}
                                capacity={room.capacity}
                                onDelete={() => deleteRoom(room)}
                            />
                        ))}
                    </TableBody>
                </Table>
                <Button
                    color='primary'
                    onClick={openRoomDialog}
                    size='large'
                >
                    add room
                </Button>
                <RoomDialog
                    open={showRoomDialog}
                    onClose={closeRoomDialog}
                    onAddRoom={addRoom}
                />
            </Section>

            {/* TIME SLOTS */}
            <Section>
                <Typography variant='subtitle2'>
                    TIME SLOTS
                </Typography>
                <Table>
                    <TableBody>
                        {timeSlots.map(timeSlot => (
                            <Timeslot
                                key={timeSlot.id}
                                start={timeSlot.startTime}
                                end={timeSlot.endTime}
                                onDelete={() => deleteTimeSlot(timeSlot)}
                            />
                        ))}
                    </TableBody>
                </Table>
                <Button
                    color='primary'
                    onClick={openTimeSlotDialog}
                    size='large'
                >
                    add time slot
                </Button>
                <TimeSlotDialog
                    open={showTimeSlotDialog}
                    onClose={closeTimeSlotDialog}
                    onAddTimeSlot={addTimeSlot}
                />
            </Section>

            {/* FAB */}
            {!(showRoomDialog || showTimeSlotDialog) && (
                <FixedFab
                    variant='extended'
                    color='primary'
                    size='medium'
                    onClick={onSubmit}
                >
                    Create Event
                </FixedFab>
            )}
        </FixedFabPageContainer>
    )
}

export default CreateGathering;


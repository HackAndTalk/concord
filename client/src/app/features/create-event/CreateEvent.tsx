import * as React from 'react';
import PageContainer from '../../components/PageContainer';
import Title from '../../components/PageTitle';
import { Typography, styled, Fab, Button, Table, TableBody } from '@material-ui/core';
import CustomTextField from '../../components/CustomTextField';
import Room from './components/room/Room';
import RoomDialog from './components/room-dialog/RoomDialog';
import moment from 'moment';
import Timeslot from './components/time-slot/Timeslot';
import TimeSlotDialog from './components/time-slot-dialog/TimeSlotDialog';

const FixedFab = styled(Fab)(({ theme }) => ({
    display: 'block',
    position: 'fixed',
    left: theme.spacing(3),
    right: theme.spacing(3),
    bottom: theme.spacing(3),

    width: `calc(100% - ${theme.spacing(3) * 2}px) !important`
}));

const FixedFabPageContainer = styled(PageContainer)(({ theme }) => ({
    paddingBottom: theme.spacing(10)
}))

const Subtitle = styled(Typography)(({ theme }) => ({
    // marginTop: theme.spacing(3)
}));

const Section = styled('div')(({ theme }) => ({
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
}))

const rooms = [
    {
        name: 'Stockholm',
        capacity: 300
    },
    {
        name: 'Malmö',
        capacity: 40
    },
    {
        name: 'Berlin',
        capacity: 5
    }
];

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

const CreateEvent: React.FC = () => {
    const [showRoomDialog, setShowRoomDialog] = React.useState(false);
    const openRoomDialog = React.useCallback(() => setShowRoomDialog(true), []);
    const closeRoomDialog = React.useCallback(() => setShowRoomDialog(false), []);

    const [showTimeSlotDialog, setShowTimeSlotDialog] = React.useState(false);
    const openTimeSlotDialog = React.useCallback(() => setShowTimeSlotDialog(true), []);
    const closeTimeSlotDialog = React.useCallback(() => setShowTimeSlotDialog(false), []);


    return (
        <FixedFabPageContainer>
            <Title variant='h6'>
                Create Event
            </Title>
            <CustomTextField
                fullWidth
                placeholder='Name'
                margin='normal'
            />

            {/* ROOMS */}
            <Section>
                <Subtitle variant='subtitle2'>
                    ROOMS
                </Subtitle>
                <Table>
                    <TableBody>
                        {rooms.map(({ name, capacity }) => (
                            <Room
                                key={name}
                                name={name}
                                capacity={capacity}
                                onEdit={() => { }}
                                onDelete={() => { }}
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
                />
            </Section>

            {/* TIME SLOTS */}
            <Section>
                <Subtitle variant='subtitle2'>
                    TIME SLOTS
            </Subtitle>
                <Table>
                    <TableBody>
                        {timeSlots.map(({ start, end }) => (
                            <Timeslot
                                key={start.toISOString()}
                                start={start}
                                end={end}
                                onEdit={() => { }}
                                onDelete={() => { }}
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
                />
            </Section>

            {/* FAB */}
            {!(showRoomDialog || showTimeSlotDialog) && (
                <FixedFab
                    variant='extended'
                    color='primary'
                    size='medium'
                >
                    Create Event
                </FixedFab>
            )}
        </FixedFabPageContainer>
    )
}

export default CreateEvent;


import * as React from 'react';
import PageContainer from '../../components/PageContainer';
import Title from '../../components/PageTitle';
import { Typography, TextField, styled, Fab, List, Button, ListItemText, ListItemSecondaryAction, ListItem, IconButton, Table, TableRow, TableBody, TableCell, Chip } from '@material-ui/core';
import CustomTextField from '../../components/CustomTextField';
import Room from './components/room/Room';
import CreateRoomDialog from './components/room/CreateRoomDialog';

const FixedFab = styled(Fab)(({ theme }) => ({
    display: 'block',
    position: 'fixed',
    left: theme.spacing(3),
    right: theme.spacing(3),
    bottom: theme.spacing(3),

    width: `calc(100% - ${theme.spacing(3) * 2}px) !important`
}));

const Subtitle = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(1)
}));

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
]

const CreateEvent: React.FC = () => {
    const [showRoomDialog, setShowRoomDialog] = React.useState(false);
    const openRoomDialog = React.useCallback(() => setShowRoomDialog(true), []);
    const closeRoomDialog = React.useCallback(() => setShowRoomDialog(false), []);


    return (
        <PageContainer>
            <Title variant='h6'>
                Create Event
            </Title>
            <CustomTextField
                fullWidth
                placeholder='Name'
                margin='normal'
            />
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
            >
                add room
            </Button>
            <CreateRoomDialog
                open={showRoomDialog}
                onClose={closeRoomDialog}
            />
            {!showRoomDialog && (
                <FixedFab
                    variant='extended'
                    color='primary'
                    size='medium'
                >
                    Create Event
                </FixedFab>
            )}
        </PageContainer>
    )
}

export default CreateEvent;


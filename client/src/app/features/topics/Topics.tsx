import * as React from 'react';
import { Typography, AppBar, IconButton, Toolbar, styled, Fab, Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Topic from './components/topic/Topic';
import AddIcon from '@material-ui/icons/Add';

const topics = [
    {
        id: 1,
        title: 'Testing Apps with Jest and React-Testing-Library',
        moderator: 'John Wayne',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        like: false
    },
    {
        id: 2,
        title: 'Domain Driven Design',
        moderator: 'Arnold Schwarzenegger',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        like: false
    },
    {
        id: 3,
        title: 'This is not a Test',
        moderator: 'Arnold Schmeekers',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        like: false
    },

]

const Root = styled('div')({
    height: '100%',
    display: 'grid',
    gridTemplateColumns: 'auto 1fr'
});

const Content = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(10)
}));

const TopicWithPadding = styled(Topic)(({ theme }) => ({
    margin: theme.spacing(1)
}));

const AddFab = styled(Fab)(({ theme }) => ({
    position: 'fixed',
    right: theme.spacing(2),
    bottom: theme.spacing(3),
}))

const Topics: React.FC = () => {
    const [showDialog, setShowDialog] = React.useState(false);
    const openDialog = React.useCallback(() => setShowDialog(true), []);
    const closeDialog = React.useCallback(() => setShowDialog(false), []);


    return (
        <>
            <AppBar>
                <Toolbar>
                    <IconButton color='inherit'>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6'>Voting</Typography>
                </Toolbar>
            </AppBar>
            <Content>
                {topics.map(topic => (
                    <TopicWithPadding
                        title={topic.title}
                        moderator={topic.moderator}
                        description={topic.description}
                        like={false}
                        onToggleLike={() => { }}
                    />
                ))}
            </Content>
            <AddFab 
                onClick={openDialog}
                color='secondary'
            >
                <AddIcon />
            </AddFab>
            <Dialog 
                open={showDialog}
                onClose={closeDialog}
                fullScreen
            >
                <DialogTitle>Create Topic</DialogTitle>
                <DialogContent>
                    <TextField 
                        variant='outlined'
                        label='Title'
                        placeholder='Life, the Universe and Everything'
                        margin='normal'
                        fullWidth
                    />
                    <TextField
                        variant='outlined'
                        label='Moderator'
                        placeholder='John Doe'
                        margin='normal'
                        fullWidth
                    />
                    <TextField
                        variant='outlined'
                        label='Description'
                        multiline
                        rows={4}
                        rowsMax={7}
                        margin='normal'
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>
                        close
                    </Button>
                    <Button 
                        variant='contained' 
                        onClick={closeDialog}
                        color='primary'
                    >
                        save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Topics;
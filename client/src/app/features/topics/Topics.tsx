import * as React from 'react';
import { Typography, AppBar, IconButton, Toolbar, styled, Fab, Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions, Box, Divider, List } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Topic from './components/topic/Topic';
import AddIcon from '@material-ui/icons/Add';
import PageContainer from '../../components/PageContainer';
import Title from '../../components/PageTitle';
import { GatheringContext } from '../../App';

const topics = [
    {
        id: 1,
        title: 'What is Figma?',
        moderator: 'John Wayne',
        description: 'I’ll give you a brief explanation of Figma and how to use it',
        like: false
    },
    {
        id: 2,
        title: 'What is Figma?',
        moderator: 'John Wayne',
        description: 'I’ll give you a brief explanation of Figma and how to use it',
        like: false
    }
];

const AddFab = styled(Fab)(({ theme }) => ({
    position: 'fixed',
    right: theme.spacing(2),
    bottom: theme.spacing(3),
}))

const Topics: React.FC = () => {
    const gathering = React.useContext(GatheringContext);

    const mode: 'suggest' | 'vote' = 'vote';

    const [showDialog, setShowDialog] = React.useState(false);
    const openDialog = React.useCallback(() => setShowDialog(true), []);
    const closeDialog = React.useCallback(() => setShowDialog(false), []);

    const titleText = mode === 'suggest'
        ? 'Suggest topics you’d like to present'
        : 'Vote for topics you’re interested in';

    if (!gathering)
        return null;

    return (
        <PageContainer>
            <Title variant='h6'>
                {titleText}
            </Title>
            <List>
                {gathering.topics.map((topic, index) => {
                    let like, onToggleLike;

                    if (mode === 'vote') {
                        like = topic.like;
                        onToggleLike = () => { }
                    }

                    return (
                        <React.Fragment key={topic.id}>
                            {index > 0 && (
                                <Divider />
                            )}
                            <Topic
                                title={topic.title}
                                moderator={''}
                                description={topic.description}
                                like={like}
                                onToggleLike={onToggleLike}
                            />
                        </React.Fragment>
                    );
                })}
            </List>
            {mode === 'suggest' && (
                <AddFab
                    onClick={openDialog}
                    color='secondary'
                >
                    <AddIcon />
                </AddFab>
            )}
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
        </PageContainer>
    )
}

export default Topics;
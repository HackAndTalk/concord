import * as React from 'react';
import { styled, Fab, Divider, List } from '@material-ui/core';
import Topic from './components/topic/Topic';
import AddIcon from '@material-ui/icons/Add';
import PageContainer from '../../components/PageContainer';
import Title from '../../components/PageTitle';
import { GatheringContext } from '../../features/active-gathering/gathering-api';
import TopicDialog from './components/topic-dialog/TopicDialog';

const AddFab = styled(Fab)(({ theme }) => ({
    position: 'fixed',
    right: theme.spacing(2),
    bottom: theme.spacing(3),
}))

const Topics: React.FC = () => {
    const [gathering] = React.useContext(GatheringContext);

    const mode = gathering.stage === 1
        ? 'suggest'
        : 'vote';

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
                        like = false;
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
            <TopicDialog
                open={showDialog}
                onClose={closeDialog}
            />
        </PageContainer>
    )
}

export default Topics;
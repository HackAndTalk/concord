import * as React from 'react';
import { IconButton, ListItem, ListItemSecondaryAction, ListItemText, styled } from '@material-ui/core';
import { CardProps } from '@material-ui/core/Card';
import LikedIcon from '@material-ui/icons/ThumbUp';
import NotLikedIcon from '@material-ui/icons/ThumbUpOutlined';
import { GatheringContext } from '../../../active-gathering/gathering-api';
import { Topic as TopicType } from '../../../../../../../shared/types';
import { useUserId } from '../../../../hooks';

const TopicText = styled(ListItemText)(({ theme }) => ({
    paddingRight: theme.spacing(4)
}));

interface IProps {
    topicId: string;
}

const Topic: React.FC<IProps & CardProps> = ({
    topicId,
    ...cardProps
}) => {
    const userId = useUserId();
    const [gathering, { toggleVoteForTopic }] = React.useContext(GatheringContext);
    const topic: TopicType | null = React.useMemo(() => {
        if (!gathering)
            return null;

        return gathering.topics.find(t => t.id === topicId);
    }, [gathering]);

    const likable = gathering && gathering.stage === 2;

    const liked = React.useMemo(() => {
        return !!topic.voterIds.find(id => id === userId);
    }, [topic, userId]);

    const toggleVote = React.useCallback(() => {
        toggleVoteForTopic(topicId);
    }, [topicId])

    if (!topic)
        return null;

    const { title, description } = topic;

    return (
        <ListItem disableGutters>
            <TopicText
                primary={title}
                secondary={description}
            />
            {likable && (
                <ListItemSecondaryAction>
                    <IconButton
                        edge='end'
                        onClick={toggleVote}
                    >
                        {liked ? (
                            <LikedIcon
                                color='primary'
                            />

                        ) : (
                                <NotLikedIcon />
                            )}
                    </IconButton>
                </ListItemSecondaryAction>
            )}
        </ListItem>
    )
}

export default Topic;
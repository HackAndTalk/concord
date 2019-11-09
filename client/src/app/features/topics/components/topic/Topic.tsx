import * as React from 'react';
import { IconButton, ListItem, ListItemSecondaryAction, ListItemText, styled } from '@material-ui/core';
import { CardProps } from '@material-ui/core/Card';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const TopicText = styled(ListItemText)(({ theme }) => ({
    paddingRight: theme.spacing(4)
}));

interface IProps {
    title: string;
    moderator: string;
    description: string;
    like?: boolean;
    onToggleLike?: () => void;
}

const Topic: React.FC<IProps & CardProps> = ({
    title,
    moderator,
    description,
    like,
    onToggleLike,
    ...cardProps
}) => {
    const [favorite, setFavorite] = React.useState(false);
    const toggleFavorite = React.useCallback(() => setFavorite(!favorite), [favorite]);

    const likable = like !== undefined && onToggleLike !== undefined;

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
                        onClick={onToggleLike}
                    >
                        <ThumbUpIcon
                            color={like ? 'primary' : undefined}
                        />
                    </IconButton>
                </ListItemSecondaryAction>
            )}
        </ListItem>
    )
}

export default Topic;
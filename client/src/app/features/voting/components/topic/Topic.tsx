import * as React from 'react';
import { Card, CardHeader, CardContent, CardActions, IconButton, Typography, Collapse } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { CardProps } from '@material-ui/core/Card';

interface IProps {
    title: string;
    moderator: string;
    description: string;
    like: boolean;
    onToggleLike: () => void;
}

const Topic: React.FC<IProps & CardProps> = ({
    title,
    moderator,
    description,
    like,
    onToggleLike,
    ...cardProps
}) => {
    const [expanded, setExpanded] = React.useState(false);
    const toggleExpand = React.useCallback(() => setExpanded(!expanded), [expanded]);

    const [favorite, setFavorite] = React.useState(false);
    const toggleFavorite = React.useCallback(() => setFavorite(!favorite), [favorite]);

    return (
        <Card {...cardProps}>
            <CardHeader
                title={title}
                subheader={moderator}
            />
            <Collapse 
                in={expanded}
                collapsedHeight='56px'
            >
                <CardContent>
                    <Typography variant='body2'>
                        {description}
                    </Typography>
                </CardContent>
            </Collapse>
            <CardActions>
                <IconButton
                    onClick={toggleFavorite}
                    color={favorite ? 'secondary' : 'inherit'}
                >
                    <FavoriteIcon />
                </IconButton>
                <span style={{ flexGrow: 1 }} />
                <IconButton
                    onClick={toggleExpand}
                >
                    {
                        expanded
                            ? <ExpandLessIcon />
                            : <ExpandMoreIcon />
                    }
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Topic;
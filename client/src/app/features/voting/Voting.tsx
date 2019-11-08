import * as React from 'react';
import { Typography, AppBar, IconButton, Toolbar, Card, CardHeader, CardContent, CardActions, styled } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Topic from './components/topic/Topic';

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

const Topics = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(2)
}));

const TopicWithPadding = styled(Topic)(({ theme }) => ({
    margin: theme.spacing(1)
}));

const Voting: React.FC = () => {


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
            <Topics>
                {topics.map(topic => (
                    <TopicWithPadding
                        title={topic.title}
                        moderator={topic.moderator}
                        description={topic.description}
                        like={false}
                        onToggleLike={() => { }}
                    />
                ))}
            </Topics>
        </>
    )
}

export default Voting;
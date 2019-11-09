import * as React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import Topics from './features/topics/Topics';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import CreateEvent from './features/create-event/CreateEvent';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import JoinEvent from './features/join-event/JoinEvent';
import ShareEvent from './features/share-event/ShareEvent';
import Schedule from './features/schedule/Schedule';
import { initializeFirebase, subscribeToGathering } from '../firebase/firebase';
import { Gathering, Participant } from '../../../shared/types';
import uuid = require('uuid');

export const GatheringContext = React.createContext<Gathering | null>(null);
export const UserContext = React.createContext<Participant | null>(null);

// STAGES
// 0 - INVITATION PHASE
// 1 - SUGGEST TOPICS
// 2 - VOTE TOPICS
// 3 - SCHEDULE

const App: React.FC = () => {
    const [gathering, setGathering] = React.useState<Gathering | null>(null);

    React.useEffect(() => {
        initializeFirebase();
        subscribeToGathering('nubuvVs6JRAeTYZ5BR7s')(gathering => {
            setGathering(gathering);
        });
    }, []);

    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <ThemeProvider theme={theme}>
                <GatheringContext.Provider value={gathering}>
                    <Router>
                        <Switch>
                            <Route path='/create-event'>
                                <CreateEvent />
                            </Route>
                            <Route path='/join-event'>
                                <JoinEvent />
                            </Route>
                            <Route path='/share-event'>
                                <ShareEvent />
                            </Route>
                            <Route path='/topics'>
                                <Topics />
                            </Route>
                            <Route path='/schedule'>
                                <Schedule />
                            </Route>
                        </Switch>
                    </Router>
                </GatheringContext.Provider>
            </ThemeProvider>
        </MuiPickersUtilsProvider>
    );
}

export default App;
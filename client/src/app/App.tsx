import * as React from 'react';
import {
    BrowserRouter as Router, Route, Switch
} from 'react-router-dom';

import Topics from './features/topics/Topics';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import CreateEvent from './features/create-event/CreateEvent';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import ShareEvent from './features/share-event/ShareEvent';
import { initializeFirebase, subscribeToGathering, suggestTopic, attachId } from '../firebase/firebase';
import { Gathering, Participant, Topic } from '../../../shared/types';
import ActiveGathering from './features/active-gathering/ActiveGathering';

const App: React.FC = () => {
    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <ThemeProvider theme={theme}>
                <Router>
                    <Switch>
                        <Route path='/create-event' exact>
                            <CreateEvent />
                        </Route>
                        <Route>
                            <ActiveGathering />
                        </Route>
                    </Switch>
                </Router>
            </ThemeProvider>
        </MuiPickersUtilsProvider>
    );
}

export default App;
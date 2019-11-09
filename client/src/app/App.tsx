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

const App: React.FC = () => {

    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <ThemeProvider theme={theme}>
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
            </ThemeProvider>
        </MuiPickersUtilsProvider>
    );
}

export default App;
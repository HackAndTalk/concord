import * as React from 'react';
import {
    BrowserRouter as Router, Route, Switch
} from 'react-router-dom';

import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import CreateGathering from './features/create-gathering/CreateGathering';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import ActiveGathering from './features/active-gathering/ActiveGathering';
import { initializeFirebase } from '../firebase/firebase';

initializeFirebase();

const App: React.FC = () => {
    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <ThemeProvider theme={theme}>
                <Router>
                    <Switch>
                        <Route path='/' exact>
                            <CreateGathering />
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
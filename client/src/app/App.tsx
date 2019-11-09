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

const App: React.FC = () => {

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <Route path='/create-event'>
                        <CreateEvent />
                    </Route>
                    <Route path='/topics'>
                        <Topics />
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;
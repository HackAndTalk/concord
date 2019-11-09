import * as React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import Topics from './features/topics/Topics';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';

const App: React.FC = () => {

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <Route path='/topics'>
                        <Topics />
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;
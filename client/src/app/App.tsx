import * as React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import Topics from './features/topics/Topics';

const App: React.FC = () => {

    return (
        <Router>
            <Switch>
                <Route path='/topics'>
                    <Topics />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
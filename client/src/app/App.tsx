import * as React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Voting from './features/voting/Voting';

const App: React.FC = () => {

    return (
        <Router>
            <Switch>
                <Route path='/voting'>
                    <Voting />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
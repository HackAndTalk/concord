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

interface GatheringApi {
    suggestTopic: (topic: Pick<Topic, 'title' | 'description'>) => void;
}
type TGatheringContext = [Gathering, GatheringApi];

const createGatheringApi = (gatheringId: string): GatheringApi => ({
    suggestTopic: partial => {
        const topic: Topic = attachId({
            ...partial,
            voterIds: [],
            moderatorId: "12512512"
        });

        console.log({ topic, partial })

        suggestTopic(gatheringId, topic);
    }
})

export const GatheringContext = React.createContext<TGatheringContext | null>(null);


const App: React.FC = () => {
    const [gathering, setGathering] = React.useState<Gathering | null>(null);

    React.useEffect(() => {
        initializeFirebase();
        subscribeToGathering('nubuvVs6JRAeTYZ5BR7s')((gathering: Gathering) => {
            setGathering(gathering);
        });
    }, []);

    const gatheringContext = React.useMemo<TGatheringContext | null>(() => {
        if (!gathering)
            return [];

        return [
            gathering,
            createGatheringApi(gathering.id)
        ];
    }, [gathering]);

    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <ThemeProvider theme={theme}>
                <GatheringContext.Provider value={gatheringContext}>
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
                </GatheringContext.Provider>
            </ThemeProvider>
        </MuiPickersUtilsProvider>
    );
}

export default App;
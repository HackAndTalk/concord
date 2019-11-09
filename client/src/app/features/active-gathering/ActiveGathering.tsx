import * as React from 'react';
import { useRouteMatch } from 'react-router';
import CreateEvent from '../create-event/CreateEvent';
import ShareEvent from '../share-event/ShareEvent';
import Topics from '../topics/Topics';
import { GatheringContext } from '../../App';

const ActiveGathering: React.FC = ({ children }) => {
  const match = useRouteMatch<{ gatheringId?: string }>('/:gatheringId');
  const gatheringId = match.params.gatheringId;

  const [gathering] = React.useContext(GatheringContext);

  const gatheringStage = gathering && gathering.stage;

  console.log({ match });

  const screen = React.useMemo(() => {
    if (!gathering)
      return null;

    switch (gatheringStage) {
      // STAGES
      // 0 - INVITATION PHASE
      case 0:
        return <ShareEvent />

      // 1 - SUGGEST TOPICS
      // 2 - VOTE TOPICS
      case 1:
      case 2:
        return <Topics />

      // 3 - SCHEDULE
      case 3:
        return <div>schedule</div>
    }

    return null;
  }, [gatheringStage]);

  return screen;
}

export default ActiveGathering;
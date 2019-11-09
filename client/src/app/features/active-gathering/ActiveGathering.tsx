import * as React from 'react';
import { useRouteMatch } from 'react-router';
import ShareEvent from '../share-event/ShareEvent';
import Topics from '../topics/Topics';
import { GatheringContext, TGatheringContext, createGatheringApi } from './gathering-api';
import { initializeFirebase, subscribeToGathering } from '../../../firebase/firebase';
import { Gathering } from '../../../../../shared/types';

const ActiveGathering: React.FC = () => {
  const [gathering, setGathering] = React.useState<Gathering | null>(null);
  const match = useRouteMatch<{ gatheringId?: string }>('/:gatheringId');
  const gatheringId = match.params.gatheringId;


  React.useEffect(() => {
    initializeFirebase();
    subscribeToGathering(gatheringId)((gathering: Gathering) => {
      setGathering(gathering);
    });
  }, [gatheringId]);


  const gatheringContext = React.useMemo<TGatheringContext>(() => {
    if (!gathering)
      return [null, {}];

    return [
      gathering,
      createGatheringApi(gathering.id)
    ];
  }, [gathering]);

  const gatheringStage = gathering && gathering.stage;

  const screen = React.useMemo(() => {
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

  return (
    <GatheringContext.Provider value={gatheringContext}>
      {screen}
    </GatheringContext.Provider>
  );
}

export default ActiveGathering;
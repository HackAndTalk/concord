import * as React from 'react';
import { useRouteMatch } from 'react-router';
import ShareEvent from '../share-event/ShareEvent';
import Topics from '../topics/Topics';
import { GatheringContext, TGatheringContext, createGatheringApi } from './gathering-api';
import { subscribeToGathering } from '../../../firebase/firebase';
import { Gathering } from '../../../../../shared/types';
import { useUserId } from '../../hooks';
import JoinEvent from '../join-event/JoinEvent';

const ActiveGathering: React.FC = () => {
  const [gathering, setGathering] = React.useState<Gathering | null>(null);
  const match = useRouteMatch<{ gatheringId?: string }>('/:gatheringId');
  const gatheringId = match.params.gatheringId;

  React.useEffect(() => {
    subscribeToGathering(gatheringId)((gathering: Gathering) => {
      setGathering(gathering);
    });
  }, [gatheringId]);

  const userId = useUserId();

  const gatheringContext = React.useMemo<TGatheringContext>(() => {
    if (!gathering || !userId)
      return [null, {}];

    return [
      gathering,
      createGatheringApi(gathering.id, userId)
    ];
  }, [gathering, userId]);


  const screen = React.useMemo(() => {
    // gathering is invalid or did not finish loading yet
    if (!gathering)
      return null;

    const { stage, participants } = gathering;

    const isParticipant = !!participants
      .find(p => p.id === userId);

    if (!isParticipant)
      return <JoinEvent />;

    // STAGES
    switch (stage) {
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
  }, [gathering, userId]);

  return (
    <GatheringContext.Provider value={gatheringContext}>
      {screen}
    </GatheringContext.Provider>
  );
}

export default ActiveGathering;
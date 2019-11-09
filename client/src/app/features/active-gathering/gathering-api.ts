import * as React from 'react';
import { Gathering, Topic, Participant } from "../../../../../shared/types";
import { attachId, suggestTopic, addParticipant } from "../../../firebase/firebase";

interface GatheringApi {
  suggestTopic: (topic: Pick<Topic, 'title' | 'description'>) => void;
  joinGathering: (name: string, isAdmin?: boolean) => void;
}

export const createGatheringApi = (gatheringId: string, userId: string): GatheringApi => ({
  suggestTopic: partial => {
    const topic: Topic = attachId({
      ...partial,
      voterIds: [],
      moderatorId: userId
    });

    suggestTopic(gatheringId, topic);
  },
  joinGathering: (name: string, isAdmin?: boolean) => {
    const participant: Participant = {
      id: userId,
      isAdmin,
      name
    };

    addParticipant(gatheringId, participant);
  }
})

export type TGatheringContext = [Gathering | null, GatheringApi];

export const GatheringContext = React.createContext<TGatheringContext | null>(null);

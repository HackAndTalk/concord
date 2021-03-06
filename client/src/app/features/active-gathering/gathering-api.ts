import * as React from 'react';
import { Gathering, Topic, Participant } from "../../../../../shared/types";
import { attachId, suggestTopic, addParticipant, addGathering, nextStage, prevStage, toggleVoteForTopic } from "../../../firebase/firebase";

interface GatheringApi {
  suggestTopic: (topic: Pick<Topic, 'title' | 'description'>) => void;
  joinGathering: (name: string, isAdmin?: boolean) => void;
  nextStage: () => void;
  prevStage: () => void;
  toggleVoteForTopic: (topicId: string) => void;
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
  },
  nextStage: () => {
    nextStage(gatheringId);
  },
  prevStage: () => {
    prevStage(gatheringId);
  },
  toggleVoteForTopic: topicId => {
    toggleVoteForTopic(gatheringId, topicId, userId)
  },
});

export const createGathering = async (userId: string, name: string, { rooms, timeSlots, title }: Pick<Gathering, 'rooms' | 'timeSlots' | 'title'>) => {
  const { id: gatheringId } = await addGathering({
    participants: [],
    stage: 0,
    topics: [],
    rooms,
    timeSlots,
    title,
  });

  await addParticipant(gatheringId, {
    id: userId,
    isAdmin: true,
    name
  });

  return gatheringId;
}

export type TGatheringContext = [Gathering | null, GatheringApi];

export const GatheringContext = React.createContext<TGatheringContext | null>(null);

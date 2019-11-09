import * as React from 'react';
import { Gathering, Topic } from "../../../../../shared/types";
import { attachId, suggestTopic } from "../../../firebase/firebase";

interface GatheringApi {
  suggestTopic: (topic: Pick<Topic, 'title' | 'description'>) => void;
}

export const createGatheringApi = (gatheringId: string): GatheringApi => ({
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

export type TGatheringContext = [Gathering | null, GatheringApi | {}];

export const GatheringContext = React.createContext<TGatheringContext | null>(null);

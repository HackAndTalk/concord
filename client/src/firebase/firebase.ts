import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { Gathering, Participant, Room, Topic } from '../../../shared/types'
import * as uuid from 'uuid'
import produce from 'immer'

export const config = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASEURL,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
}

/**
 *
 * @param customConfig Only used for testing
 */
export const initializeFirebase = (customConfig?: Object) =>
  firebase.initializeApp(customConfig || config)

/**
 * Utility functions
 */
export const attachId = <T>(document: T): T & { id: string } => ({
  ...document,
  id: uuid.v4(),
})

/**
 * Subscribe functions
 */
export const subscribeToGathering = (gatheringId: string) => (onData: any) =>
  firebase
    .firestore()
    .collection('gatherings')
    .doc(gatheringId)
    .onSnapshot({
      next: gatheringSnapshot =>
        onData({ id: gatheringSnapshot.id, ...gatheringSnapshot.data() }),
    })

/**
 * Organizer functions
 */
export const addGathering = (gathering: Omit<Gathering, 'id'>) =>
  firebase
    .firestore()
    .collection('gatherings')
    .add(gathering)

export const nextStage = (gatheringId: string) =>
  firebase
    .firestore()
    .collection('gatherings')
    .doc(gatheringId)
    .update({ stage: firebase.firestore.FieldValue.increment(1) })

export const prevStage = (gatheringId: string) =>
  firebase
    .firestore()
    .collection('gatherings')
    .doc(gatheringId)
    .update({ stage: firebase.firestore.FieldValue.increment(-1) })

/**
 * Particpiant functions
 */
export const addParticipant = (
  gatheringId: string,
  participant: Participant
) =>
  firebase
    .firestore()
    .collection('gatherings')
    .doc(gatheringId)
    .update({
      participants: firebase.firestore.FieldValue.arrayUnion(participant),
    })

export const suggestTopic = (gatheringId: string, topic: Topic) =>
  firebase
    .firestore()
    .doc(`/gatherings/${gatheringId}`)
    .update({ topics: firebase.firestore.FieldValue.arrayUnion(topic) })

export const voteForTopic = async (
  gatheringId: string,
  topicId: string,
  participantId: string,
) => {
  const gatheringRef = firebase
    .firestore()
    .collection('gatherings')
    .doc(gatheringId)
  const gatheringSnapshot = await gatheringRef.get()

  const gathering = gatheringSnapshot.data() as Omit<Gathering, 'id'>

  const updatedGathering = produce(gathering, (draftGathering: Gathering) => {
    const topicIndex = draftGathering.topics.findIndex(
      topic => topic.id === topicId,
    )
    const topic = draftGathering.topics[topicIndex]
    const participantHasVoted = topic.voterIds.some(
      voter => voter === participantId,
    )

    if (participantHasVoted)
      draftGathering.topics[topicIndex].voterIds = topic.voterIds.filter(
        voter => voter !== participantId,
      )
    else draftGathering.topics[topicIndex].voterIds.push(participantId)
  })

  return gatheringRef.set(updatedGathering)
}

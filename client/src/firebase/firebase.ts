import * as firebase from 'firebase/app'
import 'firebase/firestore'
import {
  Gathering,
  Participant,
  TimeSlot,
  Room,
  Topic,
} from '../../../shared/types'
import * as uuid from 'uuid'

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
  id: uuid(),
})

/**
 * Subscribe functions
 */
export const subscribeToGathering = (gatheringId: string) => {}

/**
 * Organizer functions
 */
export const addGathering = (gathering: Omit<Gathering, 'id'>) =>
  firebase
    .firestore()
    .collection('/gatherings')
    .add(gathering)

export const nextStage = (gatheringId: string) => {}

/**
 * Particpiant functions
 */
export const addParticipant = (
  gatheringId: string,
  participant: Omit<Participant, 'id'>,
) => {}

export const suggestTopic = (gatheringId: string, topic: Topic) => {}

export const voteForTopic = (gatheringId: string, topicId: string) => {}

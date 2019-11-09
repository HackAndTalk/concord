import { initializeFirebase, addGathering, attachId } from './firebase'
import { Participant, Room, TimeSlot } from '../../../shared/types'

import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

export const config = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASEURL,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
}

const test = async () => {
  initializeFirebase(config)

  const participant: Omit<Participant, 'id'> = { isAdmin: true, name: 'André' }
  // const topic: Omit<Topic, 'id'> = { title: 'How to use GraphQl', description: 'I will show you how to use GraphQl', moderatorId }
  const room: Omit<Room, 'id'> = { name: 'Bucharest', capacity: 5 }
  const timeslot: Omit<TimeSlot, 'id'> = {
    endTime: new Date(),
    startTime: new Date(),
  }

  addGathering({
    rooms: [attachId(room)],
    timeSlots: [attachId(timeslot)],
    topics: [],
    title: 'This is a good title',
    participants: [attachId(participant)],
  })
}

test()

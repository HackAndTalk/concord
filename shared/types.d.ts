export type Participant = {
  id: string
  name: string
  isAdmin: boolean
}

export type Room = {
  id: string
  name: string
  capacity: number
}

export type TimeSlot = {
  id: string
  startTime: Date
  endTime: Date
}

export type Topic = {
  id: string
  title: string
  description: string
  moderatorId: string
  voterIds: string[]
}

export type Gathering = {
  id: string
  title: string
  participants: Participant[]
  topics: Topic[]
  rooms: Room[]
  timeSlots: TimeSlot[]
  stage: 0 | 1 | 2 | 3
  schedule?: TimeSlotTopics[]
}

export type RoomTopic = {
  room: Room
  topic: Topic
}

export type TimeSlotTopics = {
  startTime: FirebaseTimestamp
  endTime: FirebaseTimestamp
  roomTopics: RoomTopic[]
}

export type FirebaseTimestamp = {
  seconds: number
  nanoseconds: number
}

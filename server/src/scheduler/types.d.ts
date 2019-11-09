export type Session = {
  topicId: string
  roomId: string
}

export type TimeSlotSessions = Session[]

export type Schedule = {
  timeSlotSessions: TimeSlotSessions[]
}

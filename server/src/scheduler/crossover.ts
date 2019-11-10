import { Schedule } from './types'

export const crossover = (a: Schedule, b: Schedule): Schedule => {
  const minNumTimeSlots = Math.min(
    a.timeSlotSessions.length,
    b.timeSlotSessions.length,
  )
  if (minNumTimeSlots === 0) {
    return a
  }
  if (minNumTimeSlots === 1) {
    const numSessions = (a.timeSlotSessions[0] || []).length
    const sessionCutoff = Math.ceil(numSessions / 2)
    const newTimeSlotSessions = [
      [
        ...a.timeSlotSessions[0].slice(0, sessionCutoff),
        ...b.timeSlotSessions[0].slice(sessionCutoff),
      ],
    ]
    return {
      timeSlotSessions: newTimeSlotSessions,
    }
  }

  const timeSlotCutoff = Math.ceil(a.timeSlotSessions.length / 2)
  const newTimeSlotSessions = [
    ...a.timeSlotSessions.slice(0, timeSlotCutoff),
    ...b.timeSlotSessions.slice(timeSlotCutoff),
  ]
  return {
    timeSlotSessions: newTimeSlotSessions,
  }
}

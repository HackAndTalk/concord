import { Gathering } from '../../../shared/types'
import { Schedule } from '../scheduler/types'

export const randomSchedule = ({
  timeSlots,
  rooms,
  topics,
}: Gathering): Schedule => {
  const timeSlotSessions: Schedule['timeSlotSessions'] = timeSlots.map(() => [])

  const shuffledTopics = Array.from(topics).sort(() => Math.random() - 0.5)

  for (const topic of shuffledTopics) {
    const leastOccupiedTimeSlotIndex = timeSlotSessions.reduce(
      (bestIndex, sessions, currentIndex) => {
        if (
          sessions.length < rooms.length &&
          (bestIndex === -1 ||
            sessions.length < timeSlotSessions[bestIndex].length)
        ) {
          return currentIndex
        }
        return bestIndex
      },
      -1,
    )
    const scheduleIsFull = leastOccupiedTimeSlotIndex === -1
    if (scheduleIsFull) {
      break
    }
    const sessions = timeSlotSessions[leastOccupiedTimeSlotIndex]
    const numExistingSessions = sessions.length
    const nextRoom = rooms[numExistingSessions]
    const session = {
      topicId: topic.id,
      roomId: nextRoom.id,
    }
    timeSlotSessions[leastOccupiedTimeSlotIndex].push(session)
  }
  const schedule = {
    timeSlotSessions,
  }
  return schedule
}

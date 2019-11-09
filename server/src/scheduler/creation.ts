import { Gathering } from '../../../shared/types'

export const randomSchedule = ({
  timeSlots,
  rooms,
  topics,
}: Gathering): Schedule => {
  const timeSlotSessions: Schedule['timeSlotSessions'] = timeSlots.map(() => [])

  const shuffledTopics = Array.from(topics).sort(() => Math.random() - 0.5)

  for (const topic of shuffledTopics) {
    // TODO: prefer adding to time slot with fewest sessions
    const firstAvailableTimeSlotIndex = timeSlotSessions.findIndex(
      timeSlot => timeSlot.length < rooms.length,
    )
    const scheduleIsFull = firstAvailableTimeSlotIndex === -1
    if (scheduleIsFull) {
      break
    }
    const sessions = timeSlotSessions[firstAvailableTimeSlotIndex]
    const numExistingSessions = sessions.length
    const nextRoom = rooms[numExistingSessions]
    const session = {
      topicId: topic.id,
      roomId: nextRoom.id,
    }
    timeSlotSessions[firstAvailableTimeSlotIndex].push(session)
  }
  const schedule = {
    timeSlotSessions,
  }
  return schedule
}

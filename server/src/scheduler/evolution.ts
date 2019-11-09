import { randomSchedule } from './creation'
import { penalty } from './evaluation'
import { swapSessions } from './mutation'
import { Gathering, Topic } from '../../../shared/types'

import { gathering } from '../../../shared/randomGathering'

const populationSize = 100
const numParents = 50

const timeoutMs = 5 * 1000
const start = Date.now()
const end = start + timeoutMs

const evaluateSchedule = (schedule: Schedule) => {
  return { schedule, penalty: penalty(schedule, gathering) }
}

type TimeSlotTopics = {
  startTime: Date
  endTime: Date
  topics: Topic[]
}

export const evolveSchedule = (gathering: Gathering): TimeSlotTopics[] => {
  let population = Array.from({ length: populationSize }, () =>
    randomSchedule(gathering),
  )
  do {
    const evaluatedPopulation = population
      .map(evaluateSchedule)
      .sort((a, b) => a.penalty - b.penalty)
    const parents = evaluatedPopulation
      .slice(0, numParents)
      .map(({ schedule }) => schedule)
    const children = parents.flatMap(parent =>
      Array.from({ length: 9 }, () => swapSessions(parent)),
    )
    population = [...parents, ...children]
  } while (Date.now() < end)

  const bestSchedule = population[0]

  const { timeSlots, topics } = gathering
  const scheduleTimeSlots = bestSchedule.timeSlotSessions.map(
    (sessions, index) => {
      const timeSlot = timeSlots[index]
      return {
        startTime: timeSlot.startTime,
        endTime: timeSlot.endTime,
        topics: sessions.flatMap(session =>
          topics.filter(topic => topic.id === session.topicId),
        ),
      }
    },
  )

  return scheduleTimeSlots
}
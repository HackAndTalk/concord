import { randomSchedule } from './creation'
import { penalty } from './evaluation'
import { swapSessions } from './mutation'
import { Gathering, TimeSlotTopics } from '../../../shared/types'

import { gathering } from '../../../shared/randomGathering'
import { Schedule } from './types'
import { crossover } from './crossover'

const populationSize = 100
const numParents = 20
const numMutants = populationSize - numParents

const timeoutMs = 5 * 1000
const start = Date.now()
const end = start + timeoutMs

const evaluateSchedule = (schedule: Schedule) => {
  return { schedule, penalty: penalty(schedule, gathering) }
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

    const mutationRate = Math.ceil(numMutants / numParents)

    const mutants = parents.flatMap(parent =>
      Array.from({ length: mutationRate }, () => swapSessions(parent)),
    )
    const crossovers = Array.from(
      { length: Math.floor(numParents / 2) },
      (_, i) => crossover(parents[i], parents[numParents - i - 1]),
    )
    const offspring = [...mutants, ...crossovers]

    population = [...parents, ...offspring]
  } while (Date.now() < end)

  const bestSchedule = population[0]

  const { timeSlots, rooms, topics } = gathering
  const scheduleTimeSlots = bestSchedule.timeSlotSessions.map(
    (sessions, index) => {
      const timeSlot = timeSlots[index]
      const timeSlotTopics = sessions.flatMap(session =>
        topics.filter(topic => topic.id === session.topicId),
      )
      return {
        startTime: timeSlot.startTime,
        endTime: timeSlot.endTime,
        roomTopics: timeSlotTopics.map((topic, i) => ({
          room: rooms[i],
          topic,
        })),
      }
    },
  )

  return scheduleTimeSlots
}

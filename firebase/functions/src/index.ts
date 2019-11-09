import * as functions from 'firebase-functions'
import { Gathering } from '../../../shared/types'
import { evolveSchedule } from '../../../server/src/scheduler/'

export const schedule = functions.firestore
  .document('gatherings/{gatheringId}')
  .onUpdate(gatheringSnapshot => {
    const { before, after } = gatheringSnapshot

    const gatheringDataBefore = before.data() as Gathering
    const gatheringDataAfter = after.data() as Gathering

    const shouldSchedule =
      gatheringDataBefore.stage === 2 && gatheringDataAfter.stage === 3

    if (shouldSchedule) {
      const schedule = evolveSchedule(gatheringDataAfter)
      return after.ref.update({ schedule: schedule })
    }

    return null
  })

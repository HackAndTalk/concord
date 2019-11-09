import * as functions from 'firebase-functions'
import { Gathering } from '../../../shared/types'

export const schedule = functions.firestore
  .document('gatherings/{gatheringId}')
  .onUpdate(gatheringSnapshot => {
    const { before, after } = gatheringSnapshot

    const gatheringDataBefore = before.data() as Gathering
    const gatheringDataAfter = after.data() as Gathering

    const shouldSchedule =
      gatheringDataBefore.stage === 2 && gatheringDataAfter.stage === 3

    // TODO: If shouldSchedule -> Use Ansgars function....

    if (shouldSchedule) return after.ref.update({ schedule: 'André' })

    return null
  })

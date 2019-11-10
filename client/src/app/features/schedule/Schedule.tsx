import * as React from 'react'
import FixedFabPageContainer from '../../components/FixedFabPageContainer'
import PageTitle from '../../components/PageTitle'
import Timeline from './components/Timeline'
import { GatheringContext } from '../../features/active-gathering/gathering-api'
import { Typography } from '@material-ui/core'

// const exampleSchedule = [
//   {
//     startTime: new Date('2019-11-09T12:00:00Z'),
//     endTime: new Date('2019-11-09T14:00:00Z'),
//     topics: [
//       {
//         id: '1',
//         title: 'How to use Figma',
//         description: 'Description',
//         moderator: '2',
//         voterIds: ['4'],
//       },
//       {
//         id: '2',
//         title: 'How to use GraphQL',
//         description: 'Description 2',
//         moderator: '4',
//         voterIds: ['5', '10'],
//       },
//     ],
//   },
//   {
//     startTime: new Date('2019-11-09T14:00:00Z'),
//     endTime: new Date('2019-11-09T16:00:00Z'),
//     topics: [
//       {
//         id: '1',
//         title: 'How to start a successful business',
//         description: 'Description',
//         moderator: '2',
//         voterIds: ['4'],
//       },
//       {
//         id: '2',
//         title: 'How to read 2 books a day',
//         description: 'Description 2',
//         moderator: '4',
//         voterIds: ['5', '10'],
//       },
//     ],
//   },
// ]

const Schedule: React.FC = props => {
  const [gathering] = React.useContext(GatheringContext)

  if (!gathering.schedule)
    return <Typography variant="h6">Loading...</Typography>

  return (
    <FixedFabPageContainer>
      <PageTitle variant="h6">Schedule</PageTitle>
      <Timeline schedule={gathering.schedule} />
    </FixedFabPageContainer>
  )
}

export default Schedule

import * as React from 'react'
import moment from 'moment'
import FixedFabPageContainer from '../../components/FixedFabPageContainer'
import PageTitle from '../../components/PageTitle'
import TableRow, { TableRowProps } from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { Table, TableBody } from '@material-ui/core'

const exampleSchedule = [
  {
    startTime: new Date('2019-11-09T12:00:00Z'),
    endTime: new Date('2019-11-09T14:00:00Z'),
    topics: [
      {
        id: '1',
        title: 'Title',
        description: 'Description',
        moderator: '2',
        voterIds: ['4'],
      },
      {
        id: '2',
        title: 'Title 2',
        description: 'Description 2',
        moderator: '4',
        voterIds: ['5', '10'],
      },
    ],
  },
  {
    startTime: new Date('2019-11-09T14:00:00Z'),
    endTime: new Date('2019-11-09T16:00:00Z'),
    topics: [
      {
        id: '1',
        title: 'Title',
        description: 'Description',
        moderator: '2',
        voterIds: ['4'],
      },
      {
        id: '2',
        title: 'Title 2',
        description: 'Description 2',
        moderator: '4',
        voterIds: ['5', '10'],
      },
    ],
  },
]

const Schedule: React.FC = props => {
  return (
    <FixedFabPageContainer>
      <PageTitle variant="h6">Schedule</PageTitle>
      <Table>
        <TableBody>
          {exampleSchedule.map(timeSlot => (
            <TableRow key={String(timeSlot.startTime)}>
              <TableCell>{moment(timeSlot.startTime).format('LT')}</TableCell>
              <TableCell>{timeSlot.topics[0].title}</TableCell>
              <TableCell>{timeSlot.topics[0].description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </FixedFabPageContainer>
  )
}

export default Schedule

import * as React from 'react'
import { styled, Typography, Box } from '@material-ui/core'
import {
  Topic,
  TimeSlotTopics,
  RoomTopic,
} from '../../../../../../shared/types'
import { useUserId } from '../../../hooks'
import moment from 'moment'

type TopicRowProps = {
  time: string
  topicName: string
  roomName: string
  otherTopics?: Topic[]
  isLast?: boolean
}

type TopicSuggestionsProps = {
  topics: Topic[]
}

type TimelineProps = {
  schedule: TimeSlotTopics[]
}

const orderRoomTopics = (roomTopics: RoomTopic[], participantId: string) => {
  const topicSortCompareFn = (a: RoomTopic, b: RoomTopic) =>
    a.topic.voterIds.length - b.topic.voterIds.length

  const likedRoomTopics = roomTopics
    .filter(roomTopic => roomTopic.topic.voterIds.includes(participantId))
    .sort(topicSortCompareFn)

  const notLikedRoomTopics = roomTopics
    .filter(roomTopic => !roomTopic.topic.voterIds.includes(participantId))
    .sort(topicSortCompareFn)

  return [...likedRoomTopics, ...notLikedRoomTopics]
}

const TimelineContainer = styled('div')(({ theme }) => ({
  marginLeft: -theme.spacing(3),
  marginRight: -theme.spacing(3),
}))

const TopicRowContainer = styled('div')(() => ({
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  gridTemplateColumns: 'auto 1fr',
  gridTemplateAreas: `
    "time topic-and-room"
    "line content"
  `,
  minHeight: 90,
  width: '100%',
}))

const TimeContainer = styled('div')(({ theme }) => ({
  gridArea: 'time',
  paddingRight: theme.spacing(3),
  paddingLeft: theme.spacing(3),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}))

const TopicAndRoomContainer = styled('div')(({ theme }) => ({
  gridArea: 'topic-and-room',
  display: 'flex',
  alignItems: 'center',
}))

const RelatedTopicsContainer = styled('div')(() => ({
  gridArea: 'content',
}))

const LineContainer = styled('div')(({ theme }) => ({
  gridArea: 'line',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const Line = styled('div')(() => ({
  width: 2,
  height: '100%',
  background: 'rgba(0,0,0,.1)',
}))

const TopicSuggestionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
}))

// const TopicsContainer = styled('div')(({ theme }) => ({
//   display: 'flex',
//   overflowX: 'scroll',
//   '&::-webkit-scrollbar': {
//     width: 0,
//   },
// }))

// const TopicSuggestions: React.SFC<TopicSuggestionsProps> = ({ topics }) => {
//   return (
//     <div>
//       <TopicSuggestionTitle variant="body2">OTHER TOPICS</TopicSuggestionTitle>
//       <TopicsContainer>
//         {topics.map((topic, index) => (
//           <Box key={topic.id} ml={index === 0 ? 0 : 1} flexShrink={0}>
//             <Button variant="outlined" size="small">
//               {topic.title}
//             </Button>
//           </Box>
//         ))}
//       </TopicsContainer>
//     </div>
//   )
// }

const TopicRow: React.SFC<TopicRowProps> = ({
  time,
  topicName,
  roomName,
  isLast,
  // otherTopics,
}) => {
  return (
    <TopicRowContainer>
      <TimeContainer>
        <Typography variant="body1">{time}</Typography>
      </TimeContainer>
      <LineContainer>{!isLast && <Line />}</LineContainer>
      <TopicAndRoomContainer>
        <Box>
          <Typography variant="body1">{topicName}</Typography>
          <Typography variant="body2" color="textSecondary">
            {roomName}
          </Typography>
        </Box>
      </TopicAndRoomContainer>
      {/* <RelatedTopicsContainer>
        {otherTopics && <TopicSuggestions topics={otherTopics} />}
      </RelatedTopicsContainer> */}
    </TopicRowContainer>
  )
}

const Timeline: React.FC<TimelineProps> = ({ schedule }) => {
  const userId = useUserId()

  return (
    <TimelineContainer>
      {schedule.map((timeslot, index) => {
        const topics = orderRoomTopics(timeslot.roomTopics, userId)

        return (
          <TopicRow
            time={moment(timeslot.startTime.seconds * 1000).format('HH:mm')}
            topicName={topics[0].topic.title}
            roomName={topics[0].room.name}
            isLast={index === schedule.length - 1}
            key={index}
          />
        )
      })}
    </TimelineContainer>
  )
}

export default Timeline

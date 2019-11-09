const sum = (array: number[]): number => array.reduce((a, b) => a + b, 0);

const unsatisfiedParticipantsPenalty = (
  { timeSlotSessions }: Schedule,
  { participants, topics }: Gathering,
) => {
  const timeSlotUnsatisfiedParticipants = timeSlotSessions.map(sessions => {
    const timeSlotTopics = sessions.map(session =>
      topics.find(topic => topic.id === session.topicId),
    );
    const distinctVoterIds = new Set(
      timeSlotTopics.flatMap(topic => (topic ? topic.voterIds : [])),
    );
    const numParticipants = participants.length;
    const numSatisfiedParticipants = distinctVoterIds.size;
    const numUnsatisfiedParticipants =
      numParticipants - numSatisfiedParticipants;

    return numUnsatisfiedParticipants;
  });

  const totalUnsatisfiedParticipants = sum(timeSlotUnsatisfiedParticipants);

  return totalUnsatisfiedParticipants;
};

const overbookedRoomsPenalty = ({ timeSlotSessions }: Schedule) => {
  const timeSlotDuplicateBookings = timeSlotSessions.map(timeSlot => {
    const allRoomIds = timeSlot.map(session => session.roomId);
    const distinctRoomIds = new Set(allRoomIds);
    const numDuplicateBookings = allRoomIds.length - distinctRoomIds.size;
    return numDuplicateBookings;
  });

  const totalDuplicateBookings = sum(timeSlotDuplicateBookings);

  return totalDuplicateBookings * 10;
};

const duplicateTopicsPenalty = ({ timeSlotSessions }: Schedule) => {
  const allTopicIds = timeSlotSessions.flatMap(sessions =>
    sessions.flatMap(session => session.topicId),
  );
  const allTopicIdSet = new Set(allTopicIds);

  const numDuplicateTopics = allTopicIds.length - allTopicIdSet.size;

  return numDuplicateTopics * 10;
};

const moderatorConflictPenalty = (
  { timeSlotSessions }: Schedule,
  { topics }: Gathering,
) => {
  const timeSlotDuplicateModerations = timeSlotSessions.map(sessions => {
    const allModeratorIds = sessions.flatMap(session =>
      topics.filter(topic => session.topicId === topic.id),
    );
    const distinctModeratorIds = new Set(allModeratorIds);
    const numDuplicateModerations =
      allModeratorIds.length - distinctModeratorIds.size;
    return numDuplicateModerations;
  });
  const totalDuplicateModerations = sum(timeSlotDuplicateModerations);
  return totalDuplicateModerations * 10;
};

const penaltyFunctions = [
  unsatisfiedParticipantsPenalty,
  overbookedRoomsPenalty,
  duplicateTopicsPenalty,
  moderatorConflictPenalty,
];

export const penalty = (schedule: Schedule, gathering: Gathering) => {
  const penalties = penaltyFunctions.map(func => func(schedule, gathering));
  return sum(penalties);
};

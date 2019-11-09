const randomIndex = (array: unknown[]): number =>
  Math.floor(Math.random() * array.length);

const randomChoice = <T>(array: T[]): T => array[randomIndex(array)];

export const swapSessions = (schedule: Schedule): Schedule => {
  const { timeSlotSessions } = schedule;

  // Select two distinct random time slots
  let timeSlot1Index: number;
  let timeSlot2Index: number;
  let timeSlot1;
  let timeSlot2;
  do {
    timeSlot1Index = randomIndex(timeSlotSessions);
    timeSlot2Index = randomIndex(timeSlotSessions);
    timeSlot1 = timeSlotSessions[timeSlot1Index];
    timeSlot2 = timeSlotSessions[timeSlot2Index];
  } while (
    timeSlot1Index === timeSlot2Index ||
    timeSlot1.length === 0 ||
    timeSlot2.length === 0
  );

  // Select a session from each time slot
  const session1Index = randomIndex(timeSlot1);
  const session2Index = randomIndex(timeSlot2);
  const topic1Id = timeSlotSessions[timeSlot1Index][session1Index].topicId;
  const topic2Id = timeSlotSessions[timeSlot1Index][session1Index].topicId;

  // Create schedule with swapped topics
  const newSchedule = {
    ...schedule,
    timeSlotSessions: schedule.timeSlotSessions.map((timeSlot, timeSlotIndex) =>
      timeSlot.map((session, sessionIndex) => {
        if (
          timeSlotIndex === timeSlot1Index &&
          sessionIndex === session1Index
        ) {
          return { ...session, topicId: topic2Id };
        }
        if (
          timeSlotIndex === timeSlot2Index &&
          sessionIndex === session2Index
        ) {
          return { ...session, topicId: topic1Id };
        }
        return session;
      }),
    ),
  };

  return newSchedule;
};

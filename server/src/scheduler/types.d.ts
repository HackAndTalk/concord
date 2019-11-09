type Session = {
  topicId: string;
  roomId: string;
};

type TimeSlotSessions = Session[];

type Schedule = {
  timeSlotSessions: TimeSlotSessions[];
};

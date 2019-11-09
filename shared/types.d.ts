type Participant = {
  id: string;
  name: string;
  isAdmin: boolean;
};

type Room = {
  id: string;
  name: string;
  capacity: number;
};

type TimeSlot = {
  id: string;
  startTime: Date;
  endTime: Date;
};

type Topic = {
  id: string;
  title: string;
  description: string;
  moderatorId: string;
  voterIds: string[];
};

type Gathering = {
  id: string;
  title: string;
  participants: Participant[];
  topics: Topic[];
  rooms: Room[];
  timeSlots: TimeSlot[];
};

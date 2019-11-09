const randomChoice = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];

const rooms = Array.from({ length: 3 }, (_, i) => ({
  id: `r${i}`,
  name: `Room ${i}`,
  capacity: i * 10,
}));
const timeSlots = Array.from({ length: 3 }, (_, i) => ({
  id: `ts${i}`,
  startTime: new Date(i),
  endTime: new Date(i),
}));
const participants = Array.from({ length: 30 }, (_, i) => ({
  id: `p${i}`,
  name: `Participant ${i}`,
  isAdmin: false,
}));
const topics = Array.from({ length: 12 }, (_, i) => ({
  id: `t${i}`,
  title: `Topic ${i}`,
  description: "",
  moderatorId: randomChoice(participants).id,
  voterIds: participants
    .filter(() => Math.random() < 0.2)
    .map(participant => participant.id),
}));

export const gathering: Gathering = {
  id: "g1",
  title: "Hack & Talk Barcamp",
  rooms,
  timeSlots,
  participants,
  topics,
};

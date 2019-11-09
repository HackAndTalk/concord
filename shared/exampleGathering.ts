export const gathering: Gathering = {
  id: "g1",
  title: "Hack & Talk Barcamp",
  rooms: [
    {
      id: "r1",
      name: "Paris",
      capacity: 60,
    },
    {
      id: "r2",
      name: "London",
      capacity: 30,
    },
    {
      id: "r3",
      name: "Stockholm",
      capacity: 40,
    },
  ],
  timeSlots: [
    {
      id: "ts1",
      startTime: new Date("2019-11-08T10:00:00+01:00"),
      endTime: new Date("2019-11-08T11:00:00+01:00"),
    },
    {
      id: "ts2",
      startTime: new Date("2019-11-08T12:00:00+01:00"),
      endTime: new Date("2019-11-08T13:00:00+01:00"),
    },
  ],
  participants: [
    {
      id: "p1",
      name: "Alice",
      isAdmin: true,
    },
    {
      id: "p2",
      name: "Bob",
      isAdmin: false,
    },
    {
      id: "p3",
      name: "Carol",
      isAdmin: false,
    },
    {
      id: "p4",
      name: "Dave",
      isAdmin: false,
    },
  ],
  topics: [
    {
      id: "t1",
      title: "Testing with Jest and react-testing-library",
      description: "",
      moderatorId: "p1",
      voterIds: ["p1", "p2"],
    },
    {
      id: "t2",
      title: "React and TypeScript",
      description: "",
      moderatorId: "p2",
      voterIds: ["p3", "p4"],
    },
    {
      id: "t3",
      title: "Wireframing in Figma",
      description: "",
      moderatorId: "p3",
      voterIds: ["p1", "p2", "p4"],
    },
    {
      id: "t4",
      title: "Material Design best practices",
      description: "",
      moderatorId: "p4",
      voterIds: ["p3"],
    },
  ],
};

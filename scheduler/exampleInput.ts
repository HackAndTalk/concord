const event_ = {
  title: "Hack & Talk Barcamp",
  rooms: [
    {
      name: "Paris",
      capacity: 60,
    },
    {
      name: "London",
      capacity: 30,
    },
  ],
  timeSlots: [
    {
      startTime: "2019-11-08T10:00:00+01:00",
      endTime: "2019-11-08T11:00:00+01:00",
    },
    {
      startTime: "2019-11-08T12:00:00+01:00",
      endTime: "2019-11-08T13:00:00+01:00",
    },
  ],
  participants: [
    {
      id: 1,
      name: "Alice",
    },
    {
      id: 2,
      name: "Bob",
    },
    {
      id: 3,
      name: "Carol",
    },
    {
      id: 4,
      name: "Dave",
    },
  ],
  topics: [
    {
      id: 10,
      moderator: 1,
      title: "Testing with Jest and react-testing-library",
      description: "",
      voters: [1, 2],
    },
    {
      id: 11,
      moderator: 2,
      title: "React and TypeScript",
      description: "",
      voters: [3, 4],
    },
    {
      id: 12,
      moderator: 3,
      title: "Wireframing in Figma",
      description: "",
      voters: [1, 2, 4],
    },
    {
      id: 13,
      moderator: 4,
      title: "Material Design best practices",
      description: "",
      voters: [3],
    },
  ],
};

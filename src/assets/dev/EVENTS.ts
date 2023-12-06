export const EVENTS = [
  {
    id: 0,
    title: "Board meeting",
    start: new Date(2023, 11, 7, 9, 0, 0),
    end: new Date(2023, 11, 7, 13, 0, 0),
    resourceId: 1,
  },
  {
    id: 1,
    title: "MS training",
    allDay: true,
    start: new Date(2023, 11, 9, 14, 0, 0),
    end: new Date(2023, 11, 9, 16, 30, 0),
    resourceId: 2,
  },
  {
    id: 2,
    title: "Team lead meeting",
    start: new Date(2023, 11, 10, 8, 30, 0),
    end: new Date(2023, 11, 10, 12, 30, 0),
    resourceId: [2, 3],
  },
  {
    id: 11,
    title: "Birthday Party",
    start: new Date(2023, 11, 16, 7, 0, 0),
    end: new Date(2023, 11, 18, 10, 30, 0),
    resourceId: 4,
  },
];

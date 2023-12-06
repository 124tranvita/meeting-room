export type EntryEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description: string;
  allDay: boolean;
  rooms: string[];
  type: string;
  confirmed: string;
  repeatType: string;
  duration?: string;
  lastUpdated?: string;
  createdBy?: string;
  modifiedBy?: string;
};

export const initialEntryEvent: EntryEvent = {
  id: "",
  title: "",
  start: new Date(),
  end: new Date(),
  description: "",
  allDay: false,
  rooms: [],
  type: "",
  confirmed: "",
  repeatType: "",
  duration: "",
  lastUpdated: "",
  createdBy: "",
  modifiedBy: "",
};

export type EventData = {
  events: EntryEvent[];
  event: EntryEvent;
};

export const initEventsData: EventData = {
  events: [],
  event: initialEntryEvent,
};

import { Event } from "@microsoft/microsoft-graph-types";
import { EntryEvent, initialEntryEvent } from "../common/model";
import { addHours } from "./date-func";

export const serializeOutlookSyncedData = (
  outlookCalendarEvt: Event[],
  events: EntryEvent[]
) => {
  if (!outlookCalendarEvt || outlookCalendarEvt.length === 0) return [];

  const fetchedEvent = outlookCalendarEvt.map((item: Event) => {
    const start = item.start ? addHours(item.start.dateTime, 7) : new Date();

    const end = item.end ? addHours(item.end.dateTime, 7) : new Date();
    return {
      ...initialEntryEvent,
      id: item.id || "",
      title: item.subject || "",
      start,
      end,
      allDay: item.isAllDay,
    };
  });

  const data = [...events, ...fetchedEvent];

  const clearDuplicate = [
    ...new Map(data.map((item) => [item.id, item])).values(),
  ];

  return clearDuplicate;
};

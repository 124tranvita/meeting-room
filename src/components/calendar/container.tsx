import { FC, useCallback, useEffect, useState } from "react";
import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
  SlotInfo,
} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";

import "react-big-calendar/lib/css/react-big-calendar.css";

import { getDateRange } from "../../utils/date-fnc";
import AddEvtModal from "../add-event-modal/";

import { EntryEvent, initialEntryEvent } from "../../common/model";
import EventDetailModal from "../event-detail-modal";
import { useEventContext, useOutlookCalendarSync } from "../../hooks";
import { ACT_SET_EVENT } from "../../context/eventContext/constants";
import { InteractionStatus } from "@azure/msal-browser";
import { Event } from "@microsoft/microsoft-graph-types";
import { addHours } from "../../utils/date-func";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Calendar: FC = () => {
  const { events, event, dispatchEvent } = useEventContext();
  const { apiData, inProgress, callCalendarApi } = useOutlookCalendarSync();
  const { min, max } = getDateRange();
  const [isOpenAddEntry, setIsOpenAddEntry] = useState(false);
  const [isOpenEntryDetail, setIsOpenAddEntryDetail] = useState(false);
  const [eventTime, setEventTime] = useState({
    start: new Date(),
    end: new Date(),
  });

  console.log({ apiData, inProgress });

  useEffect(() => {
    if (apiData && inProgress === InteractionStatus.None) {
      const fetchedEvent = apiData.data.value.map((item: Event) => {
        const start = item.start
          ? addHours(item.start.dateTime, 7)
          : new Date();

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

      dispatchEvent({
        type: ACT_SET_EVENT,
        payload: { events: [...events, ...fetchedEvent], event },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiData]);

  const handleSelectSlot = useCallback((slotInfo: SlotInfo) => {
    const { start, end } = slotInfo;
    setEventTime({
      start,
      end,
    });
    setIsOpenAddEntry(true);
  }, []);

  const handleSelectEvent = useCallback(
    (event: EntryEvent) => {
      dispatchEvent({
        type: ACT_SET_EVENT,
        payload: { events, event },
      });
      setIsOpenAddEntryDetail(true);
    },
    [dispatchEvent, events]
  );

  const handleCalendarSync = useCallback(() => {
    return callCalendarApi({
      method: "GET",
      url: `/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location`,
      headers: {
        accept: "*/*",
      },
    });
  }, [callCalendarApi]);

  return (
    <>
      <BigCalendar
        defaultView="day"
        events={events}
        localizer={localizer}
        style={{ height: "90vh" }}
        min={min}
        max={max}
        step={15}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        showMultiDayTimes
      />
      <AddEvtModal
        isOpen={isOpenAddEntry}
        setIsOpen={setIsOpenAddEntry}
        startDt={eventTime.start}
        endDt={eventTime.end}
      />
      <EventDetailModal
        isOpen={isOpenEntryDetail}
        setIsOpen={setIsOpenAddEntryDetail}
      />
      <button onClick={handleCalendarSync}>Sync</button>
    </>
  );
};

// const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1);
// const now = new Date();
// const start = endOfHour(now);
// const end = addHours(start, 2);

export default Calendar;

import { FC, useCallback, useState } from "react";
import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
  Event,
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

import { EVENTS } from "../../assets/dev/EVENTS";

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
  const { min, max } = getDateRange();
  const [isOpen, setIsOpen] = useState(false);
  const [eventTime, setEventTime] = useState({
    start: new Date(),
    end: new Date(),
  });
  const [events, setEvents] = useState<Event[]>(EVENTS);

  // const onEventResize: withDragAndDropProps["onEventResize"] = (data) => {
  //   const { start, end } = data;

  //   setEvents((currentEvents) => {
  //     const firstEvent = {
  //       start: new Date(start),
  //       end: new Date(end),
  //     };
  //     return [...currentEvents, firstEvent];
  //   });
  // };

  const handleSelect = useCallback((slotInfo: SlotInfo) => {
    const { start, end } = slotInfo;
    setEventTime({
      start,
      end,
    });
    setIsOpen(true);
  }, []);

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
        onSelectSlot={handleSelect}
        showMultiDayTimes
      />
      <AddEvtModal
        events={events}
        setEvents={setEvents}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        startDt={eventTime.start}
        endDt={eventTime.end}
      />
    </>
  );
};

// const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1);
// const now = new Date();
// const start = endOfHour(now);
// const end = addHours(start, 2);

export default Calendar;

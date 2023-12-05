import { FC, useCallback, useState } from "react";
import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
  Event,
  SlotInfo,
} from "react-big-calendar";
import withDragAndDrop, {
  withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import addHours from "date-fns/addHours";
import startOfHour from "date-fns/startOfHour";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getDateRange } from "../../utils/date-fnc";
import AddEvtModal from "../add-event-modal/";

const Calendar: FC = () => {
  const { min, max } = getDateRange();
  const [isOpen, setIsOpen] = useState(false);
  const [eventTime, setEventTime] = useState({
    start: new Date(),
    end: new Date(),
  });
  const [events, setEvents] = useState<Event[]>([
    {
      title: "Learn cool stuff",
      start,
      end,
    },
  ]);

  // call API

  const onEventResize: withDragAndDropProps["onEventResize"] = (data) => {
    const { start, end } = data;

    setEvents((currentEvents) => {
      const firstEvent = {
        start: new Date(start),
        end: new Date(end),
      };
      return [...currentEvents, firstEvent];
    });
  };

  const onEventDrop: withDragAndDropProps["onEventDrop"] = (data) => {
    console.log(data);
  };

  const handleSelect = useCallback((slotInfo: SlotInfo) => {
    const { start, end } = slotInfo;
    setEventTime({
      start,
      end,
    });
    setIsOpen(true);
    // const title = window.prompt("New Event name");
    // if (title)
    //   setEvents([
    //     ...events,
    //     {
    //       start,
    //       end,
    //       title,
    //     },
    //   ]);
  }, []);

  return (
    <>
      <DnDCalendar
        defaultView="day"
        events={events}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        resizable
        style={{ height: "100%" }}
        min={min}
        max={max}
        step={15}
        selectable
        onSelectSlot={handleSelect}
      />
      <AddEvtModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        startDt={eventTime.start}
        endDt={eventTime.end}
      />
    </>
  );
};

const locales = {
  "en-US": enUS,
};
const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1);
const now = new Date();
const start = endOfHour(now);
const end = addHours(start, 2);
// The types here are `object`. Strongly consider making them better as removing `locales` caused a fatal error
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const DnDCalendar = withDragAndDrop(BigCalendar);

export default Calendar;

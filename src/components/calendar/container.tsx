import { FC, useCallback, useState } from "react";
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

import { EntryEvent } from "../../common/model";
import EventDetailModal from "../event-detail-modal";
import { useEventContext } from "../../hooks";
import { ACT_SET_EVENT } from "../../context/eventContext/constants";

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
  const { events, dispatchEvent } = useEventContext();
  const { min, max } = getDateRange();
  const [isOpenAddEntry, setIsOpenAddEntry] = useState(false);
  const [isOpenEntryDetail, setIsOpenAddEntryDetail] = useState(false);
  const [eventTime, setEventTime] = useState({
    start: new Date(),
    end: new Date(),
  });

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
    </>
  );
};

// const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1);
// const now = new Date();
// const start = endOfHour(now);
// const end = addHours(start, 2);

export default Calendar;

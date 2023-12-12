import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, ToolbarProps } from "react-big-calendar";
import { InteractionStatus } from "@azure/msal-browser";
import { dateFormatter, getDayOfWeekSUN } from "../../utils/date-func";
import { useEventContext, useOutlookCalendarSync } from "../../hooks";
import { ACT_SET_EVENT } from "../../context/eventContext/constants";
import { serializeOutlookSyncedData } from "../../utils/data";
import { ControlBtnGroup, ViewControlBtnGroup } from "./components";

import "react-big-calendar/lib/css/react-big-calendar.css";

const CustomToolbar: FC<ToolbarProps> = (props) => {
  const { events, event, dispatchEvent } = useEventContext();
  const { apiData, inProgress, callCalendarApi } = useOutlookCalendarSync();
  const [viewState, setViewState] = useState("day");

  const dateLabel = useMemo(() => {
    const { firstDay, lastDay } = getDayOfWeekSUN(props.date);
    const weekLabel = `${dateFormatter(
      firstDay,
      "dd MMM yyyy"
    )} - ${dateFormatter(lastDay, "dd MMM yyyy")}`;

    switch (viewState) {
      case "day":
        return dateFormatter(props.date, "MMMM, dd yyyy");
      case "month":
        return dateFormatter(props.date, "MMMM yyyy");
      case "week":
        return weekLabel;
      default:
        break;
    }
  }, [props.date, viewState]);

  const goToDayView = () => {
    props.onView("day");
    setViewState("day");
  };
  const goToWeekView = () => {
    props.onView("week");
    setViewState("week");
  };
  const goToMonthView = () => {
    props.onView("month");
    setViewState("month");
  };

  const goToBack = () => {
    props.onNavigate(Navigate.PREVIOUS);
  };

  const goToNext = () => {
    props.onNavigate(Navigate.NEXT);
  };

  const goToToday = () => {
    props.onNavigate(Navigate.TODAY);
  };

  const handleCalendarSync = useCallback(() => {
    return callCalendarApi({
      method: "GET",
      url: `/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location`,
      headers: {
        accept: "*/*",
      },
    });
  }, [callCalendarApi]);

  useEffect(() => {
    if (apiData && inProgress === InteractionStatus.None) {
      const fetchedEvent = serializeOutlookSyncedData(
        apiData.data.value,
        events
      );

      dispatchEvent({
        type: ACT_SET_EVENT,
        payload: { events: [...fetchedEvent], event },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiData]);

  //   // if you decided to inject a datepicker such as MUI or React Widgets ones, use this function on datepicker onChange
  //   const goToSpecificDate = (newDate: Date) => {
  //     props.onNavigate(Navigate.DATE, newDate);
  //   };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <ViewControlBtnGroup
          viewState={viewState}
          goToDayView={goToDayView}
          goToWeekView={goToWeekView}
          goToMonthView={goToMonthView}
          handleSync={handleCalendarSync}
        />
        <label className="flex-1 font-semibold text-xl">{dateLabel}</label>
        <ControlBtnGroup
          goToBack={goToBack}
          goToToday={goToToday}
          goToNext={goToNext}
        />
      </div>
    </div>
  );
};

export default CustomToolbar;

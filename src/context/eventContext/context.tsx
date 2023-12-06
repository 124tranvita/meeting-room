import {
  Dispatch,
  FC,
  ReactNode,
  createContext,
  useEffect,
  useReducer,
} from "react";
import {
  EntryEvent,
  EventData,
  initEventsData,
  initialEntryEvent,
} from "../../common/model";
import * as Constants from "./constants";

type ContextType = {
  event: EntryEvent;
  events: EntryEvent[];
  dispatchEvent: Dispatch<ActionType>;
};

type StateType = {
  event: EntryEvent;
  events: EntryEvent[];
};

type ActionType = {
  type: Constants.Types;
  payload: EventData;
};

export const EventContext = createContext<ContextType>({
  event: initialEntryEvent,
  events: [],
  dispatchEvent: () => null,
});

const eventReducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case Constants.ACT_SET_EVENT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

type Props = {
  children: ReactNode;
};

export const EventContextProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, {
    ...initEventsData,
  });

  useEffect(() => {
    const getEventsFromLocalStorage = () => {
      try {
        return JSON.parse(localStorage.getItem("events") || "");
      } catch (error) {
        return null;
      }
    };
    const events = getEventsFromLocalStorage();

    if (events) {
      const data = events.map((item: EntryEvent) => {
        return {
          ...item,
          start: new Date(item.start),
          end: new Date(item.end),
        };
      });
      dispatch({
        type: Constants.ACT_SET_EVENT,
        payload: { ...state, events: data },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <EventContext.Provider value={{ ...state, dispatchEvent: dispatch }}>
      {children}
    </EventContext.Provider>
  );
};

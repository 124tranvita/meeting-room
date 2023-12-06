import { useContext } from "react";
import { EventContext } from "../context";

const useEventContext = () => {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error(
      "useEventContext must be used inside the EventContextProvider"
    );
  }

  return context;
};

export default useEventContext;

import Calendar from "./components/calendar/";
import "./App.css";
import { EventContextProvider } from "./context";
import { EVENTS } from "./assets/dev/EVENTS";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(EVENTS));
  }, []);

  return (
    <div className="relative">
      <EventContextProvider>
        <Calendar />
      </EventContextProvider>
    </div>
  );
}

export default App;

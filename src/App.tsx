import { FC, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { EVENTS } from "./assets/dev/EVENTS";
// import { Navbar } from "./common/components";
import { CalendarPages, ConfigurationPage, HomePage } from "./pages";
import { useDeviceConfigContext } from "./hooks";

const App: FC = () => {
  const { device } = useDeviceConfigContext();

  console.log({ device });

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(EVENTS));
  }, []);

  return (
    <main className="relative">
      <Router>
        {/* <Navbar /> */}
        <div className="mx-auto max-w-1280px text-center">
          <Routes>
            <Route
              path="/"
              element={
                device.isConfigured ? <HomePage /> : <ConfigurationPage />
              }
            />
            <Route path="/calendar" element={<CalendarPages />} />
            {/* <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </div>
      </Router>
    </main>
  );
};

export default App;

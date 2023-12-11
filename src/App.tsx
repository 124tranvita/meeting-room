import { FC, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { EVENTS } from "./assets/dev/EVENTS";
// import { Navbar } from "./common/components";
import { CalendarPages } from "./pages";

const App: FC = () => {
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(EVENTS));
  }, []);

  return (
    <main className="relative">
      <Router>
        {/* <Navbar /> */}
        <div className="mt-3 mx-auto max-w-1280px text-center">
          <Routes>
            <Route path="/" element={<CalendarPages />} />
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

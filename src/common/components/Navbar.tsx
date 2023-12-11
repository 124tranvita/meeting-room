import { FC } from "react";
import { NavLink } from "react-router-dom";

const Navbar: FC = () => {
  return (
    <header className="h-26 flex justify-between items-center sm:px-16 px-8 py-4 w-full mx-auto fixed top-0 bg-blue-500 z-10 right-0 left-0">
      <div>
        <NavLink
          to="/"
          className="w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md"
        >
          <p>AH</p>
        </NavLink>
      </div>
      <div className="flex jis">
        <nav className="flex text-base gap-7 font-medium">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "text-black"
            }
          >
            Help
          </NavLink>
        </nav>
        <nav className="flex text-base gap-7 font-medium">
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "text-black"
            }
          >
            Rooms
          </NavLink>
        </nav>
        <nav className="flex text-base gap-7 font-medium">
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "text-black"
            }
          >
            Users
          </NavLink>
        </nav>
        <nav className="flex text-base gap-7 font-normal">
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "text-black"
            }
          >
            Log off
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

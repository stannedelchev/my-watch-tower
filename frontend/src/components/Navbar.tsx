import { Calendar, Clock, MapPinHouse, Satellite, Target } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <div className="constrained-content">
        <ul>
          <li>
            <NavLink to="/">
              <Calendar /> <span className="only-above-md">Passes</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/timeline">
              <Clock /> <span className="only-above-md">Timeline</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/sky-now">
              <Target /> <span className="only-above-md">Sky Now</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/stations">
              <MapPinHouse />{" "}
              <span className="only-above-md">Ground Stations</span>
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink to="/satellite-list">
              <Satellite />{" "}
              <span className="only-above-md">Satellite Tracking</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

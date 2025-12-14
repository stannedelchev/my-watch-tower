import { Calendar, Clock, MapPinHouse, Satellite, Target } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <div className="constrained-content">
        <ul>
          <li>
            <NavLink to="/">
              <Calendar /> <span>Passes</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/timeline">
              <Clock /> <span>Timeline</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/sky-now">
              <Target /> <span>Sky Now</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/stations">
              <MapPinHouse /> <span>Ground Stations</span>
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink to="/satellites">
              <Satellite /> <span>Satellite Tracking</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

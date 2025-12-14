import { MapPin, TowerControl } from "lucide-react";

export default function Header() {
  return (
    <header>
      <div className="constrained-content">
        <h1>
          <TowerControl size={48} /> My Watch Tower
        </h1>
        <div className="right-header">
          <MapPin />
          <select>
            <option>Ground Station 1</option>
            <option>Ground Station 2</option>
          </select>
        </div>
      </div>
    </header>
  );
}

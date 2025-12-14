import { MapPin, TowerControl } from "lucide-react";
import StationSelector from "./StationSelector";

export default function Header() {
  return (
    <header>
      <div className="constrained-content">
        <h1>
          <TowerControl size={48} /> My Watch Tower
        </h1>
        <div className="right-header">
          <MapPin />
          <StationSelector />
        </div>
      </div>
    </header>
  );
}

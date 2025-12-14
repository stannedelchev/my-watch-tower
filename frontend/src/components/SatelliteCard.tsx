import type { SatelliteEntity } from "../model";

export default function SatelliteCard({ item }: { item: SatelliteEntity }) {
  return (
    <div className="satellite-card">
      <h3>{item.name}</h3>
      <p>NORAD ID: {item.id}</p>
      <p>Tracked: {item.isTracked ? "Yes" : "No"}</p>
      <p>Tags: {item.tags.map((tag) => tag.name).join(", ")}</p>
      <div>
        {item.transmitters.map((tx) => (
          <div key={tx.id} className="transmitter-card">
            <p>{tx.description?.toString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

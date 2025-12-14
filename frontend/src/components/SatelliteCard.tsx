import type { SatelliteEntity } from "../model";

export default function SatelliteCard({ item }: { item: SatelliteEntity }) {
  const formatFrequency = (freq: number | null) => {
    if (freq === null) return "N/A";
    const freqNum = Number(freq);
    if (freqNum >= 1_000_000_000) {
      return (freqNum / 1_000_000_000).toFixed(2) + " GHz";
    } else if (freqNum >= 1_000_000) {
      return (freqNum / 1_000_000).toFixed(2) + " MHz";
    } else if (freqNum >= 1_000) {
      return (freqNum / 1_000).toFixed(2) + " kHz";
    } else {
      return freqNum + " Hz";
    }
  };
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
            <p>Uplink: {formatFrequency(tx.uplinkLow)}</p>
            <p>Downlink: {formatFrequency(tx.downlinkLow)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

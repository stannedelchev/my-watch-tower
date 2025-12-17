import { ClockFading, TriangleRight } from "lucide-react";
import type { PassEventEntity } from "../model";
import { useEffect, useState } from "react";

export default function PassEventCard({ item }: { item: PassEventEntity }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update current time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateStr: string) => {
    // if today - display only HH:mm:ss (24h format), else "YYYY-MM-DD<br />HH:mm:ss"
    const date = new Date(dateStr);
    const now = new Date();
    if (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    ) {
      return <span>{date.toLocaleTimeString([], { hourCycle: "h24" })}</span>;
    } else {
      return (
        <span>
          {date.toLocaleDateString()}
          <br />
          {date.toLocaleTimeString([], { hourCycle: "h24" })}
        </span>
      );
    }
  };
  // 75 => "1m 15s"
  // 3800 => "1h 3m 20s"
  const formatDuration = (durationSec: number) => {
    const hours = Math.floor(durationSec / 3600);
    const minutes = Math.floor((durationSec % 3600) / 60);
    const seconds = durationSec % 60;
    let result = "";
    if (hours > 0) {
      result += `${hours}h `;
    }
    if (minutes > 0) {
      result += `${minutes}m `;
    }
    result += `${seconds}s`;
    return result.trim();
  };

  // 0-30: "red", 31-60: "yellow", 61-90: "green"
  const formatElevationClassName = (elevation: number) => {
    if (elevation <= 30) return "red";
    if (elevation <= 60) return "yellow";
    return "green";
  };

  const isCurrentlyPassing = () => {
    const aos = new Date(item.aos);
    const los = new Date(item.los);
    return currentTime >= aos && currentTime <= los;
  };

  const formatProgressPercent = (aos: string, los: string) => {
    const aosDate = new Date(aos);
    const losDate = new Date(los);
    if (currentTime < aosDate) return 0;
    if (currentTime > losDate) return 100;
    const totalDuration = losDate.getTime() - aosDate.getTime();
    const elapsedDuration = currentTime.getTime() - aosDate.getTime();
    return (elapsedDuration / totalDuration) * 100;
  };

  return (
    <div className="pass-event-card">
      <div className="header">
        <div className="aos">{formatDate(item.aos)}</div>
        <h3>{item.satellite.name}</h3>
        <div className="los">{formatDate(item.los)}</div>
      </div>
      {isCurrentlyPassing() && (
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${formatProgressPercent(item.aos, item.los)}%` }}
          />
        </div>
      )}
      {/* how to present visible vs actual elevation for best UI/UX? */}
      <div className="details">
        <div className={`elevation `}>
          <div
            className={`visible ${formatElevationClassName(
              item.maxVisibleElevation
            )}`}
          >
            <TriangleRight /> {item.maxVisibleElevation.toFixed(0)}°
          </div>
          <div className="max">
            ({item.maxElevation.toFixed(0)}° max possible)
          </div>
        </div>
        <div className="duration">
          <div className="visible">
            <ClockFading /> {formatDuration(item.totalVisibleDuration)}
          </div>
          <div className="max">
            ({formatDuration(item.duration)} max possible)
          </div>
        </div>
      </div>
    </div>
  );
}

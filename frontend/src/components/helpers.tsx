export const formatFrequency = (freq: number | null) => {
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

export const formatDate = (dateStr: string) => {
  // if today - display only HH:mm:ss (24h format), else "YYYY-MM-DD<br />HH:mm:ss"
  const date = new Date(dateStr);
  const now = new Date();
  if (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    return <div>{date.toLocaleTimeString([], { hourCycle: "h24" })}</div>;
  } else {
    return (
      <div>
        {date.toLocaleDateString()}
        <br />
        {date.toLocaleTimeString([], { hourCycle: "h24" })}
      </div>
    );
  }
};

// 75 => "1m 15s"
// 3800 => "1h 3m 20s"
export const formatDuration = (durationSec: number) => {
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
export const formatElevationClassName = (elevation: number) => {
  if (elevation <= 30) return "red";
  if (elevation <= 60) return "yellow";
  return "green";
};

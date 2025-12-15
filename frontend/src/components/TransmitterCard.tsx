import {
  CircleQuestionMark,
  MoveDown,
  MoveUp,
  MoveVertical,
} from "lucide-react";
import type { TransmitterEntity } from "../model";

export default function TransmitterCard({ item }: { item: TransmitterEntity }) {
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
  const formatTxDirection = (
    tx: TransmitterEntity
  ): "uplink" | "downlink" | "duplex" | "unknown" => {
    if (tx.uplinkLow && tx.downlinkLow) {
      return "duplex";
    } else if (tx.uplinkLow) {
      return "uplink";
    } else if (tx.downlinkLow) {
      return "downlink";
    } else {
      return "unknown";
    }
  };

  const direction = formatTxDirection(item);

  return (
    <div className="transmitter-card">
      {direction === "duplex" && <MoveVertical />}
      {direction === "uplink" && <MoveUp />}
      {direction === "downlink" && <MoveDown />}
      {direction === "unknown" && <CircleQuestionMark />}
      {item.uplinkLow && !item.downlinkLow && formatFrequency(item.uplinkLow)}
      {item.downlinkLow && !item.uplinkLow && formatFrequency(item.downlinkLow)}
      {item.uplinkLow && item.downlinkLow && (
        <>
          {formatFrequency(item.uplinkLow)} -{" "}
          {formatFrequency(item.downlinkLow)}
        </>
      )}
      <div>{item.description?.toString()}</div>
    </div>
  );
}

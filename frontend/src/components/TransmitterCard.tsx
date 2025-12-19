import {
  CircleQuestionMark,
  MoveDown,
  MoveUp,
  MoveVertical,
} from "lucide-react";
import type { TransmitterEntity } from "../model";
import { formatFrequency } from "./helpers";

export default function TransmitterCard({ item }: { item: TransmitterEntity }) {
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

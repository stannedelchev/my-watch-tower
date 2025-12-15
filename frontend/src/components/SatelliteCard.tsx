import { Star, Tag } from "lucide-react";
import type { SatelliteEntity } from "../model";
import { useTrackSatellite } from "../api/generated/satellites/satellites";
import { useQueryClient } from "@tanstack/react-query";
import TransmitterCard from "./TransmitterCard";

export default function SatelliteCard({ item }: { item: SatelliteEntity }) {
  const queryClient = useQueryClient();
  const setTrackedMutation = useTrackSatellite({
    mutation: {
      onSuccess: () => {
        // Invalidate and refetch satellites list
        queryClient.invalidateQueries({ queryKey: ["/satellites"] });
      },
    },
  });

  const toggleTracked = () => {
    setTrackedMutation.mutate({
      id: item.id.toString(),
      data: { isTracked: !item.isTracked },
    });
  };
  return (
    <div
      className={`satellite-card ${item.isTracked ? "tracked" : "untracked"}`}
    >
      <div className={`col`}>
        <Star
          className={`tracked-indicator ${
            item.isTracked ? "tracked" : "untracked"
          }`}
          onClick={toggleTracked}
        />
      </div>
      <div className="col">
        <h3>{item.name}</h3>
        <p className="norad">NORAD ID: {item.id}</p>
      </div>

      <div className="col">
        <div className="tag-list">
          <Tag size={16} />{" "}
          {item.tags.map((tag) => (
            <div className="tag">{tag.name}</div>
          ))}
        </div>
      </div>
      <div className="col transmitter-list">
        {item.transmitters.map((tx) => (
          <TransmitterCard key={tx.id} item={tx} />
        ))}
      </div>
    </div>
  );
}

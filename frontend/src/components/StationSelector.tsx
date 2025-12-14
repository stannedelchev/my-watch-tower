import { useNavigate } from "react-router-dom";
import { useGetAllGroundStations } from "../api/generated/ground-stations/ground-stations";
import { useCurrentGroundStationStore } from "../stores/currentGroundStationStore";

export default function StationSelector() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllGroundStations();
  const { currentGroundStationId, setCurrentGroundStationId } =
    useCurrentGroundStationStore();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    if (selectedId === "new") {
      navigate("/stations/new");
    } else {
      setCurrentGroundStationId(parseInt(selectedId));
    }
  };

  // TODO: auto select an initial station?
  return (
    <select onChange={handleChange} value={currentGroundStationId || "new"}>
      {isLoading && <option>Loading stations...</option>}
      {data &&
        data.map((station) => (
          <option
            key={station.id}
            value={station.id}
          >
            {station.name}
          </option>
        ))}
      <option value="new">--- Add new GS</option>
    </select>
  );
}

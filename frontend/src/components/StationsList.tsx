import { Link } from "react-router-dom";
import { useGetAllGroundStations } from "../api/generated/ground-stations/ground-stations";
import type { GroundStationEntity } from "../model";

export default function StationsList() {
  const { data, isLoading, error } = useGetAllGroundStations();
  return (
    <div>
      <h2>Ground Stations</h2>
      {isLoading && <p>Loading ground stations...</p>}
      {error && <p>Error loading ground stations: {String(error)}</p>}
      {data && (
        <ul>
          {data.map((station: GroundStationEntity) => (
            <li key={station.id}>
              <Link to={`/stations/${station.id}/edit`}>Edit</Link> -
              {station.name} - ({station.latitude}, {station.longitude})
            </li>
          ))}
        </ul>
      )}
      <Link to="/stations/new">Create New Station</Link>
    </div>
  );
}

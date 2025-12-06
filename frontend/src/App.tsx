import { useGetAllGroundStations } from "./api/generated/ground-stations/ground-stations";
import "./App.css";
import type { GroundStationEntity } from "./model";

function App() {
  const { data, isLoading, error } = useGetAllGroundStations();

  return (
    <>
      <div className="card">
        <div id="ground-stations">
          <h2>Ground Stations</h2>
          {isLoading && <p>Loading ground stations...</p>}
          {error && <p>Error loading ground stations: {String(error)}</p>}
          {data && (
            <ul>
              {data.map((station: GroundStationEntity) => (
                <li key={station.id}>
                  {station.name} - ({station.latitude}, {station.longitude})
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default App;

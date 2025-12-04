import { useGetAllStations } from "./api/generated/ground-stations/ground-stations";
import "./App.css";

function App() {
  const { data, isLoading, error } = useGetAllStations();

  return (
    <>
      <div className="card">
        <div id="ground-stations">
          <h2>Ground Stations</h2>
          {isLoading && <p>Loading ground stations...</p>}
          {error && <p>Error loading ground stations: {String(error)}</p>}
          {data && (
            <ul>
              {data.map((station: any) => (
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

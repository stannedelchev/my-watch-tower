import { Link, useParams } from "react-router-dom";
import {
  useComparePassEventsForCurrentOrbit,
  useGetPassEventById,
} from "../api/generated/pass-events/pass-events";
import {
  formatDate,
  formatDuration,
  formatElevationClassName,
} from "./helpers";
import "@/styles/PassDetails.scss";
import { Check, ClockFading, TriangleRight } from "lucide-react";

export default function PassDetails() {
  const { id } = useParams();
  const { data, error, isLoading } = useGetPassEventById(id!);
  const { data: comparisonData } = useComparePassEventsForCurrentOrbit(id!);
  // TODO: on error, render error message returned from API, but first define global 404 entity response in NestJs
  return (
    <div className="pass-details">
      {isLoading && <p>Loading pass details...</p>}
      {error && <p>Error loading pass details: {String(error)}</p>}
      {data && (
        <>
          <div className="pass-header">
            <h1>{data?.satellite?.name}</h1>
            <p>NORAD ID: {data?.satellite?.id}</p>
            <p>Orbit number: {data?.orbitNumber}</p>
          </div>
          <div className="pass-comparison">
            {comparisonData && comparisonData.length > 0 ? (
              <div className="pass-comparison-list">
                <h2>Comparison with other passes in the same orbit:</h2>
                {comparisonData.map((pass) => (
                  <Link
                    key={pass.id}
                    to={`/pass-events/${pass.id}`}
                    className="pass-comparison-card"
                  >
                    <h3 className="col">
                      {pass.groundStationId === data?.groundStationId && (
                        <Check />
                      )}
                      <span>{pass.groundStation.name}</span>
                    </h3>
                    <div className="col">{formatDate(pass.aos)}</div>
                    <div className="col">{formatDate(pass.los)}</div>
                    <div className="elevation col large">
                      <div
                        className={`visible ${formatElevationClassName(
                          pass.maxVisibleElevation
                        )}`}
                      >
                        <TriangleRight /> {pass.maxVisibleElevation.toFixed(0)}°
                      </div>
                      <div className="max">
                        ({pass.maxElevation.toFixed(0)}° max possible)
                      </div>
                    </div>
                    <div className="duration col large">
                      <div className="visible">
                        <ClockFading />{" "}
                        {formatDuration(pass.totalVisibleDuration)}
                      </div>
                      <div className="max">
                        ({formatDuration(pass.duration)} max possible)
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p>No other passes found for this orbit.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

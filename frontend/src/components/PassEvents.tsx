import { useState } from "react";
import { useGetPassEventsByGroundStationId } from "../api/generated/pass-events/pass-events";
import { useCurrentGroundStationStore } from "../stores/currentGroundStationStore";
import ReactPaginate from "react-paginate";
import PassEventCard from "./PassEventCard";
import "@/styles/PassEventList.scss";
import { useGetAllGroundStations } from "../api/generated/ground-stations/ground-stations";

export default function PassEvents() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: groundStations } = useGetAllGroundStations();
  const { currentGroundStationId } = useCurrentGroundStationStore();
  const { data, error } = useGetPassEventsByGroundStationId(
    {
      page: currentPage.toString(),
      groundStationId: currentGroundStationId?.toString() || "",
    },
    {
      query: {
        enabled: !!currentGroundStationId,
      },
    }
  );

  const handlePageChange = (selectedItem: { selected: number }) => {
    // ReactPaginate uses 0-based indexing, but our API uses 1-based
    setCurrentPage(selectedItem.selected + 1);
  };

  return (
    <div>
      <h2>Pass Events for {groundStations?.find(gs => gs.id === currentGroundStationId)?.name || "Selected Ground Station"}</h2>
      {!currentGroundStationId && (
        <p>Please select a ground station (above).</p>
      )}
      {error && <p>Error loading pass events: {String(error)}</p>}
      {data && (
        <>
          <div className="pass-event-list">
            {data.items.map((passEvent) => (
              <PassEventCard key={passEvent.id} item={passEvent} />
            ))}
          </div>
          <div className="pagination-center">
            <ReactPaginate
              className="pagination"
              pageCount={data.pageCount}
              previousLabel="<"
              nextLabel=">"
              forcePage={currentPage - 1} // Keep pagination in sync (0-based)
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
}

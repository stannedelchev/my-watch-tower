import ReactPaginate from "react-paginate";
import { useGetSatellites } from "../api/generated/satellites/satellites";
import { useState } from "react";
import SatelliteCard from "./SatelliteCard";
import "@/styles/SatelliteList.scss";
import GlobalFilters from "./GlobalFilters";
import { useFilterStore } from "../stores/globalFiltersStore";

export default function SatelliteList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { filters } = useFilterStore();
  const { data, error } = useGetSatellites({
    page: currentPage.toString(),
    ...filters,
    frequencyFilters: filters.frequencyFilters
      ? JSON.stringify(filters.frequencyFilters)
      : undefined,
  });

  const handlePageChange = (selectedItem: { selected: number }) => {
    // ReactPaginate uses 0-based indexing, but our API uses 1-based
    setCurrentPage(selectedItem.selected + 1);
  };

  return (
    <div>
      <h2>Satellites</h2>
      <GlobalFilters />
      {/* {isLoading && <p>Loading satellites...</p>} */}
      {error && <p>Error loading satellites: {String(error)}</p>}
      {data && (
        <>
          <div className="satellite-list">
            {data.items.map((satellite) => (
              <SatelliteCard key={satellite.id} item={satellite} />
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

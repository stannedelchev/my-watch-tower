import { useForm } from "react-hook-form";
import { useGetTags } from "../api/generated/tags/tags";
import "@/styles/GlobalFilters.scss";
import { Check, CircleX } from "lucide-react";
import { useFilterStore, type FilterState } from "../stores/globalFiltersStore";


export default function GlobalFilters() {
  const { data } = useGetTags();
  const { filters, setFilters } = useFilterStore();
  const { register, handleSubmit, reset } = useForm<FilterState>();
  const onSubmit = (data: FilterState) => {
    setFilters(data);
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== undefined && value !== ""
  );

  return (
    <form className="global-filters" onSubmit={handleSubmit(onSubmit)}>
      <h2>Global Filters</h2>
      <div className="form-groups">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            {...register("name")}
            placeholder="Name or NORAD ID"
          />
        </div>
        <div className="form-group">
          <label htmlFor="tracked">Tracked</label>
          <select id="tracked" {...register("tracked")}>
            <option value="">All</option>
            <option value="true">Tracked</option>
            <option value="false">Untracked</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="tag">Tag</label>
          <select id="tag" {...register("tag")}>
            <option value="">All</option>
            {data?.map((tag) => (
              <option key={tag.id} value={tag.name}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          {/* sorry for the ugly hack :) */}
          <label>&nbsp;</label>
          <button type="submit">
            <Check /> Apply Filters
          </button>
        </div>
        {hasActiveFilters && (
          <div className="form-group">
            <label>&nbsp;</label>
            <button
              type="reset"
              onClick={() => {
                reset();
                setFilters({});
              }}
            >
              <CircleX /> Clear
            </button>
          </div>
        )}
      </div>
      <div className="frequency-filters">
        TODO
      </div>
    </form>
  );
}

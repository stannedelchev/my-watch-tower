import { useFieldArray, useForm } from "react-hook-form";
import { useGetTags } from "../api/generated/tags/tags";
import "@/styles/GlobalFilters.scss";
import { Check, CircleX, Plus, Trash2 } from "lucide-react";
import { useFilterStore, type FilterState } from "../stores/globalFiltersStore";

export default function GlobalFilters() {
  const { data } = useGetTags();
  const { filters, setFilters } = useFilterStore();
  const { register, handleSubmit, reset, control } = useForm<FilterState>({
    defaultValues: {
      ...filters,
      // Convert Hz to MHz for display
      frequencyFilters:
        filters.frequencyFilters?.map((f) => ({
          ...f,
          min: f.min / 1_000_000,
          max: f.max / 1_000_000,
        })) || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "frequencyFilters",
  });

  const addFrequencyFilter = () => {
    append({ direction: "downlink", min: 0, max: 0 });
  };

  const onSubmit = (data: FilterState) => {
    // Clean up empty frequency filters
    const cleanedData = {
      ...data,
      frequencyFilters: data.frequencyFilters
        ?.filter((f) => f.min !== undefined && f.max !== undefined)
        // inputs are in MHz, but API expects Hz
        .map((f) => ({
          ...f,
          min: f.min * 1_000_000, // Convert MHz to Hz
          max: f.max * 1_000_000, // Convert MHz to Hz
        })),
    };
    setFilters(cleanedData);
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
      <div className="frequency-filters form-groups">
        <fieldset>
          <legend>Frequency Bands</legend>
          {fields.map((field, index) => (
            <div key={field.id} className="frequency-row">
              <div className="form-group">
                <label htmlFor={`direction-${index}`}>Direction</label>
                <select
                  id={`direction-${index}`}
                  {...register(`frequencyFilters.${index}.direction`)}
                >
                  <option value="downlink">Downlink</option>
                  <option value="uplink">Uplink</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor={`min-${index}`}>Min (MHz)</label>
                <input
                  id={`min-${index}`}
                  type="number"
                  step="0.001"
                  {...register(`frequencyFilters.${index}.min`, {
                    valueAsNumber: true,
                  })}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`max-${index}`}>Max (MHz)</label>
                <input
                  id={`max-${index}`}
                  type="number"
                  step="0.001"
                  {...register(`frequencyFilters.${index}.max`, {
                    valueAsNumber: true,
                  })}
                />
              </div>
              <div className="form-group">
                <label>&nbsp;</label>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="delete-btn"
                  title="Remove filter"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addFrequencyFilter}
            className="add-filter-btn"
          >
            <Plus size={16} /> Add Frequency Filter
          </button>
        </fieldset>
      </div>
    </form>
  );
}

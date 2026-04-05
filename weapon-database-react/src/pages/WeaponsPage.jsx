import { useDeferredValue, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ErrorPanel from "../components/ErrorPanel";
import LoadingPanel from "../components/LoadingPanel";
import WeaponCard from "../components/WeaponCard";
import useCategories from "../hooks/useCategories";
import useWeapons from "../hooks/useWeapons";

function WeaponsPage() {
  const { weapons, loading, error } = useWeapons();
  const { categories } = useCategories();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const deferredSearch = useDeferredValue(search);
  const activeCategory = searchParams.get("category") || "all";

  const selectedCategory = categories.find(
    (category) => String(category.category_id) === activeCategory,
  );

  const visibleWeapons = weapons.filter((weapon) => {
    const matchesCategory =
      activeCategory === "all" ||
      weapon.category_name === selectedCategory?.category_name;

    const haystack = [
      weapon.weapon_name,
      weapon.category_name,
      weapon.damage,
      weapon.fire_rate,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = haystack.includes(deferredSearch.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <section className="search-panel fade-rise">
        <div className="section-head">
          <div>
            <h2>Weapons Grid</h2>
            <p>
              Browse the full arsenal with live search and category-driven
              filtering.
            </p>
          </div>
          <span className="status-pill">{visibleWeapons.length} results</span>
        </div>

        <div className="filter-row">
          <input
            type="search"
            value={search}
            placeholder="Filter by name, class, or stat"
            onChange={(event) => setSearch(event.target.value)}
          />
          <select
            className="filter-select"
            value={activeCategory}
            onChange={(event) => {
              const next = new URLSearchParams(searchParams);
              next.set("category", event.target.value);
              setSearchParams(next);
            }}
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        <div className="search-actions" style={{ marginTop: "14px" }}>
          <button
            type="button"
            className={`filter-chip${activeCategory === "all" ? " active" : ""}`}
            onClick={() => {
              const next = new URLSearchParams(searchParams);
              next.set("category", "all");
              setSearchParams(next);
            }}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              type="button"
              key={category.category_id}
              className={`filter-chip${
                activeCategory === String(category.category_id) ? " active" : ""
              }`}
              onClick={() => {
                const next = new URLSearchParams(searchParams);
                next.set("category", String(category.category_id));
                setSearchParams(next);
              }}
            >
              {category.category_name}
            </button>
          ))}
        </div>
      </section>

      {loading ? <LoadingPanel label="Loading weapons grid..." /> : null}
      {error ? <ErrorPanel message={error} /> : null}

      {!loading && !error && visibleWeapons.length === 0 ? (
        <div className="empty-state glass-panel">
          <h3>No weapons match the current filters.</h3>
          <p>Try a different category or clear the search text.</p>
        </div>
      ) : null}

      {!loading && !error && visibleWeapons.length > 0 ? (
        <section className="weapon-grid">
          {visibleWeapons.map((weapon) => (
            <WeaponCard key={weapon.weapon_id} weapon={weapon} />
          ))}
        </section>
      ) : null}
    </>
  );
}

export default WeaponsPage;

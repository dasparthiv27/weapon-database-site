import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import WeaponCard from "../components/WeaponCard";
import useWeapons from "../hooks/useWeapons";

function SearchResultsPage() {
  const { weapons, loading } = useWeapons();
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim().toLowerCase();

  const matches = query
    ? weapons.filter((weapon) =>
        weapon.weapon_name.toLowerCase().includes(query),
      )
    : [];

  return (
    <>
      <section className="search-panel fade-rise">
        <div className="section-head">
          <div>
            <h2>Search Weapons</h2>
            <p>Live suggestions plus a dedicated result page for fast lookups.</p>
          </div>
          <span className="status-pill">
            {query
              ? `${matches.length} match${matches.length === 1 ? "" : "es"}`
              : "Awaiting query"}
          </span>
        </div>
        <SearchBar
          key={searchParams.get("q") || ""}
          weapons={weapons}
          initialQuery={searchParams.get("q") || ""}
        />
      </section>

      {loading ? null : query && matches.length > 0 ? (
        <section className="weapon-grid">
          {matches.map((weapon) => (
            <WeaponCard key={weapon.weapon_id} weapon={weapon} />
          ))}
        </section>
      ) : (
        <div className="empty-state glass-panel">
          <h3>{query ? "No matching weapon found." : "Start a search."}</h3>
          <p>
            {query
              ? "Try another spelling or browse the full weapons grid."
              : "Type a weapon name above to search the arsenal."}
          </p>
        </div>
      )}
    </>
  );
}

export default SearchResultsPage;

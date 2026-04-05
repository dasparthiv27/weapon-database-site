import { useDeferredValue, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUiSounds from "../hooks/useUiSounds";

function SearchBar({ weapons = [], compact = false, initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery);
  const deferredQuery = useDeferredValue(query);
  const navigate = useNavigate();
  const { playClick, playHover } = useUiSounds();

  const normalized = deferredQuery.trim().toLowerCase();
  const suggestions =
    normalized.length === 0
      ? []
      : [...new Set(weapons.map((weapon) => weapon.weapon_name))]
          .filter((name) => name.toLowerCase().includes(normalized))
          .slice(0, 6);

  const submit = (value) => {
    const next = value.trim();
    navigate(next ? `/search?q=${encodeURIComponent(next)}` : "/search");
  };

  return (
    <div className="search-bar">
      <div className="search-bar__row">
        <input
          type="search"
          value={query}
          placeholder={
            compact ? "Search loadout" : "Enter weapon name (example: MP40)"
          }
          aria-label="Search weapons"
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              playClick();
              submit(query);
            }
          }}
        />
        <button
          type="button"
          className="primary-btn"
          onClick={() => {
            playClick();
            submit(query);
          }}
          onMouseEnter={playHover}
        >
          Search
        </button>
      </div>

      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((suggestion) => (
            <button
              type="button"
              key={suggestion}
              className="suggestion-button"
              onClick={() => {
                playClick();
                setQuery(suggestion);
                submit(suggestion);
              }}
              onMouseEnter={playHover}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;

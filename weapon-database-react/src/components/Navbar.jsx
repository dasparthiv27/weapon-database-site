import { NavLink } from "react-router-dom";
import useUiSounds from "../hooks/useUiSounds";
import SearchBar from "./SearchBar";

function Navbar({ weapons }) {
  const { playClick, playHover } = useUiSounds();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink
          to="/"
          className="site-brand"
          onClick={playClick}
          onMouseEnter={playHover}
        >
          <span className="site-brand__eyebrow">Loadout Terminal</span>
          <span className="site-brand__title">Weapon Database</span>
        </NavLink>

        <nav className="navbar" aria-label="Primary">
          {["/", "/weapons", "/categories", "/search"].map((path, index) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `nav-link${isActive ? " active" : ""}`
              }
              onClick={playClick}
              onMouseEnter={playHover}
            >
              {["Home", "Weapons", "Categories", "Search"][index]}
            </NavLink>
          ))}
        </nav>

        <div className="nav-search">
          <SearchBar weapons={weapons} compact />
        </div>
      </div>
    </header>
  );
}

export default Navbar;

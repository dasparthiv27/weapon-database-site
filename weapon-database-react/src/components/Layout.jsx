import { Outlet } from "react-router-dom";
import useWeapons from "../hooks/useWeapons";
import BackgroundFrame from "./BackgroundFrame";
import Navbar from "./Navbar";

function Layout() {
  const { weapons } = useWeapons();

  return (
    <div className="app-shell">
      <BackgroundFrame />
      <div className="layout-overlay">
        <Navbar weapons={weapons} />
        <main className="page-shell">
          <Outlet />
        </main>
        <footer className="footer-note">
          Mission-ready access to categories, weapon profiles, and live search.
        </footer>
      </div>
    </div>
  );
}

export default Layout;

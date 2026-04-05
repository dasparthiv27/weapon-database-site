import { useMemo } from "react";
import { Link } from "react-router-dom";
import ErrorPanel from "../components/ErrorPanel";
import LoadingPanel from "../components/LoadingPanel";
import useWeapons from "../hooks/useWeapons";

function AdminWeapons() {
  const { weapons, loading, error } = useWeapons();
  const rows = useMemo(() => (Array.isArray(weapons) ? weapons : []), [weapons]);

  return (
    <section className="page-section fade-rise">
      <div className="section-head">
        <div>
          <h1>Admin Weapons</h1>
          <p>Browse the current inventory and jump into edit flows from one place.</p>
        </div>
        <div className="section-actions">
          <Link className="ghost-btn" to="/admin">
            Dashboard
          </Link>
          <Link className="primary-btn" to="/admin/add">
            Add Weapon
          </Link>
        </div>
      </div>

      {loading ? <LoadingPanel label="Loading admin weapons..." /> : null}
      {error ? <ErrorPanel message={error} /> : null}

      {!loading && !error ? (
        <div className="admin-table glass-panel">
          <div className="admin-table__head">
            <span>Weapon</span>
            <span>Category</span>
            <span>Units</span>
            <span>Actions</span>
          </div>

          {rows.map((weapon) => (
            <article key={weapon.weapon_id} className="admin-table__row">
              <div>
                <strong>{weapon.weapon_name}</strong>
              </div>
              <span>{weapon.category_name || "Unassigned"}</span>
              <span>{weapon.units_available ?? 0}</span>
              <div className="admin-actions">
                <Link className="ghost-btn" to={`/admin/edit/${weapon.weapon_id}`}>
                  Edit
                </Link>
              </div>
            </article>
          ))}

          {rows.length === 0 ? <p className="panel-copy">No weapons available.</p> : null}
        </div>
      ) : null}
    </section>
  );
}

export default AdminWeapons;

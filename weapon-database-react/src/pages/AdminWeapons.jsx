import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ErrorPanel from "../components/ErrorPanel";
import LoadingPanel from "../components/LoadingPanel";
import useWeapons from "../hooks/useWeapons";
import { requestJson } from "../lib/api";
import { DEFAULT_WEAPON_IMAGE_PATH, getWeaponImage } from "../utils/getWeaponImage";

function AdminWeapons() {
  const { weapons, loading, error } = useWeapons();
  const [items, setItems] = useState([]);
  const [deleteError, setDeleteError] = useState("");
  const [pendingId, setPendingId] = useState(null);
  const rows = useMemo(() => (Array.isArray(weapons) ? weapons : []), [weapons]);
  const list = items.length > 0 ? items : rows;

  const handleDelete = async (weaponId, weaponName) => {
    const confirmed = window.confirm(`Delete ${weaponName}? This action cannot be undone.`);

    if (!confirmed) {
      return;
    }

    setDeleteError("");
    setPendingId(weaponId);

    try {
      await requestJson(`/weapons/${weaponId}`, { method: "DELETE" });
      setItems((current) => {
        const source = current.length > 0 ? current : rows;
        return source.filter((weapon) => weapon.weapon_id !== weaponId);
      });
    } catch (err) {
      setDeleteError(err.message || "Unable to delete weapon.");
    } finally {
      setPendingId(null);
    }
  };

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
      {deleteError ? <ErrorPanel message={deleteError} /> : null}

      {!loading && !error ? (
        <div className="admin-table glass-panel">
          <div className="admin-table__head">
            <span>Weapon</span>
            <span>Category</span>
            <span>Units</span>
            <span>Actions</span>
          </div>

          {list.map((weapon) => (
            <article key={weapon.weapon_id} className="admin-table__row">
              {console.log("Loading image:", weapon.image)}
              <div className="admin-weapon-cell">
                <img
                  src={getWeaponImage(weapon.image)}
                  alt={weapon.weapon_name}
                  onError={(event) => {
                    event.currentTarget.src = DEFAULT_WEAPON_IMAGE_PATH;
                  }}
                />
                <div>
                  <strong>{weapon.weapon_name}</strong>
                  <p className="meta-copy">Damage {weapon.damage} | Fire Rate {weapon.fire_rate}</p>
                </div>
              </div>
              <span>{weapon.category_name || "Unassigned"}</span>
              <span>{weapon.units_available ?? 0}</span>
              <div className="admin-actions">
                <Link className="ghost-btn" to={`/admin/edit/${weapon.weapon_id}`}>
                  Edit
                </Link>
                <button
                  type="button"
                  className="ghost-btn danger-btn"
                  disabled={pendingId === weapon.weapon_id}
                  onClick={() => handleDelete(weapon.weapon_id, weapon.weapon_name)}
                >
                  {pendingId === weapon.weapon_id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </article>
          ))}

          {list.length === 0 ? <p className="panel-copy">No weapons available.</p> : null}
        </div>
      ) : null}
    </section>
  );
}

export default AdminWeapons;

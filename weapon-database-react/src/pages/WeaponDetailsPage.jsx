import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AnimatedStatBar from "../components/AnimatedStatBar";
import ErrorPanel from "../components/ErrorPanel";
import LoadingPanel from "../components/LoadingPanel";
import { fetchJson } from "../lib/api";
import { DEFAULT_WEAPON_IMAGE_PATH, getWeaponImage } from "../utils/getWeaponImage";

function WeaponDetailsPage() {
  const { id } = useParams();
  const [weapon, setWeapon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    fetchJson(`/weapons/${id}`)
      .then((data) => {
        if (!active) {
          return;
        }
        setWeapon(data || null);
        setError("");
      })
      .catch((err) => {
        if (!active) {
          return;
        }
        setError(err.message || "Unable to load weapon details.");
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return <LoadingPanel label="Loading weapon profile..." />;
  }

  if (error || !weapon) {
    return <ErrorPanel message={error || "Weapon not found."} />;
  }

  console.log("Loading image:", weapon.image);

  const attachments = weapon.attachments
    ? weapon.attachments.split(",").map((item) => item.trim()).filter(Boolean)
    : [];

  return (
    <section className="detail-grid fade-rise">
      <div className="detail-panel">
        <div className="detail-image">
          <img
            src={getWeaponImage(weapon.image)}
            alt={weapon.weapon_name}
            onError={(event) => {
              event.currentTarget.src = DEFAULT_WEAPON_IMAGE_PATH;
            }}
          />
        </div>

        <div className="detail-head">
          <div>
            <span className="badge">{weapon.category_name || "Weapon"}</span>
            <h1>{weapon.weapon_name}</h1>
          </div>
          <span className="status-pill">{weapon.units_available} units</span>
        </div>

        <div className="detail-meta">
          <span className="badge">Reload {weapon.reload_time}s</span>
          <span className="badge">Magazine {weapon.magazine_size}</span>
        </div>

        <div className="detail-actions" style={{ marginTop: "20px" }}>
          <Link className="ghost-btn" to="/weapons">
            Back to Weapons
          </Link>
          <Link className="ghost-btn" to={`/search?q=${weapon.weapon_name}`}>
            Search Similar
          </Link>
        </div>
      </div>

      <div className="detail-stack">
        <div className="stats-panel">
          <div className="section-head">
            <div>
              <h2>Performance Telemetry</h2>
              <p>Animated bars adapted from the original weapon detail screen.</p>
            </div>
          </div>

          <div className="stat-list">
            <AnimatedStatBar label="Damage" value={weapon.damage} />
            <AnimatedStatBar label="Fire Rate" value={weapon.fire_rate} />
            <AnimatedStatBar label="Range" value={weapon.range_value} />
            <AnimatedStatBar label="Accuracy" value={weapon.accuracy} />
            <AnimatedStatBar label="Mobility" value={weapon.mobility} />
          </div>
        </div>

        <div className="stats-panel">
          <div className="section-head">
            <div>
              <h2>Attachment Profile</h2>
              <p>Current support package for this weapon platform.</p>
            </div>
          </div>
          {attachments.length > 0 ? (
            <ul className="attachments-list">
              {attachments.map((attachment) => (
                <li key={attachment}>{attachment}</li>
              ))}
            </ul>
          ) : (
            <p className="panel-copy">No attachments assigned.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default WeaponDetailsPage;

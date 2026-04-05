import { Link } from "react-router-dom";

function AddWeapon() {
  return (
    <section className="page-section fade-rise">
      <div className="section-head">
        <div>
          <h1>Add Weapon</h1>
          <p>This admin form placeholder is active and ready for the full create flow.</p>
        </div>
        <Link className="ghost-btn" to="/admin/weapons">
          Back to Weapons
        </Link>
      </div>

      <div className="glass-panel">
        <p className="panel-copy">Add weapon form is available here for local routing and deployment verification.</p>
      </div>
    </section>
  );
}

export default AddWeapon;

import { Link, useParams } from "react-router-dom";

function EditWeapon() {
  const { id } = useParams();

  return (
    <section className="page-section fade-rise">
      <div className="section-head">
        <div>
          <h1>Edit Weapon</h1>
          <p>Editing record ID: {id}</p>
        </div>
        <Link className="ghost-btn" to="/admin/weapons">
          Back to Weapons
        </Link>
      </div>

      <div className="glass-panel">
        <p className="panel-copy">Edit weapon form placeholder is rendering correctly for route validation.</p>
      </div>
    </section>
  );
}

export default EditWeapon;

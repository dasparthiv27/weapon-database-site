import { Link, useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <section className="page-section fade-rise">
      <div className="section-head">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage weapons, add new records, and edit existing inventory entries.</p>
        </div>
        <button
          type="button"
          className="ghost-btn"
          onClick={() => {
            localStorage.removeItem("adminAuth");
            navigate("/admin/login", { replace: true });
          }}
        >
          Log Out
        </button>
      </div>

      <div className="category-grid" style={{ marginTop: "24px" }}>
        <Link className="category-card fade-rise" to="/admin/weapons">
          <div className="category-card__title-row">
            <div>
              <h3>Manage Weapons</h3>
              <p className="meta-copy">Review, edit, and remove weapon records.</p>
            </div>
            <span className="badge">Inventory</span>
          </div>
        </Link>

        <Link className="category-card fade-rise" to="/admin/add">
          <div className="category-card__title-row">
            <div>
              <h3>Add Weapon</h3>
              <p className="meta-copy">Create a new weapon record in the database.</p>
            </div>
            <span className="badge">Create</span>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default AdminDashboard;

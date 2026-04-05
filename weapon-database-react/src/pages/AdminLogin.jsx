import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getIsAdmin } from "../components/AdminRoute";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  if (getIsAdmin()) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setPending(true);
    setError("");

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin", { replace: true });
      return;
    }

    setError("Invalid admin credentials.");
    setPending(false);
  };

  return (
    <section className="page-section fade-rise">
      <div className="glass-panel" style={{ maxWidth: "520px", margin: "0 auto" }}>
        <h1>Admin Login</h1>
        <p className="panel-copy">Sign in to access the weapon database control panel.</p>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px", marginTop: "20px" }}>
          <label className="admin-field">
            <span>Username</span>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              required
            />
          </label>

          <label className="admin-field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </label>

          {error ? <div className="error-panel">{error}</div> : null}

          <button className="primary-btn" type="submit" disabled={pending}>
            {pending ? "Signing In..." : "Enter Admin Panel"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AdminLogin;

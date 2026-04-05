import { Navigate, Outlet, useLocation } from "react-router-dom";

export function getIsAdmin() {
  return localStorage.getItem("adminAuth") === "true";
}

const AdminRoute = () => {
  const location = useLocation();
  const isAuthenticated = getIsAdmin();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/admin/login" replace state={{ from: location }} />
  );
};

export default AdminRoute;

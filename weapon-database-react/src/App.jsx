import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import AdminRoute from "./components/AdminRoute";

// Public Pages
import HomePage from "./pages/HomePage";
import WeaponsPage from "./pages/WeaponsPage";
import WeaponDetailsPage from "./pages/WeaponDetailsPage";
import CategoriesPage from "./pages/CategoriesPage";
import SearchResultsPage from "./pages/SearchResultsPage";

// Admin Pages
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminWeapons from "./pages/AdminWeapons";
import AddWeapon from "./pages/AddWeapon";
import EditWeapon from "./pages/EditWeapon";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="weapons" element={<WeaponsPage />} />
          <Route path="weapon/:id" element={<WeaponDetailsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="search" element={<SearchResultsPage />} />
        </Route>

        {/* ADMIN LOGIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* PROTECTED ADMIN ROUTES */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/weapons" element={<AdminWeapons />} />
          <Route path="/admin/add" element={<AddWeapon />} />
          <Route path="/admin/edit/:id" element={<EditWeapon />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<h1>404 Not Found</h1>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
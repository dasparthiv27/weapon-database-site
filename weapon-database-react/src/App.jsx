import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import AdminRoute from "./components/AdminRoute";
import HomePage from "./pages/HomePage";
import WeaponsPage from "./pages/WeaponsPage";
import WeaponDetailsPage from "./pages/WeaponDetailsPage";
import CategoriesPage from "./pages/CategoriesPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminWeapons from "./pages/AdminWeapons";
import AddWeapon from "./pages/AddWeapon";
import EditWeapon from "./pages/EditWeapon";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/weapons" element={<WeaponsPage />} />
          <Route path="/weapon/:id" element={<WeaponDetailsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminRoute />}>
          <Route index element={<AdminDashboard />} />
          <Route path="weapons" element={<AdminWeapons />} />
          <Route path="add" element={<AddWeapon />} />
          <Route path="edit/:id" element={<EditWeapon />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

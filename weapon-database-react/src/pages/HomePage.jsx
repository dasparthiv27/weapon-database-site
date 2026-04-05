import { Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import LoadingPanel from "../components/LoadingPanel";
import WeaponCard from "../components/WeaponCard";
import useCategories from "../hooks/useCategories";
import useWeapons from "../hooks/useWeapons";

function HomePage() {
  const { weapons, loading: weaponsLoading } = useWeapons();
  const { categories, loading: categoriesLoading } = useCategories();
  const featuredWeapons = weapons.slice(0, 3);

  return (
    <>
      <section className="hero-panel fade-rise">
        <div className="hero-copy">
          <div>
            <span className="hero-copy__intro">Tactical Access Granted</span>
            <h1>Military Weapon Database</h1>
          </div>

          <div className="hero-actions">
            <Link className="primary-btn" to="/weapons">
              Open Arsenal
            </Link>
            <Link className="ghost-btn" to="/categories">
              Browse Categories
            </Link>
            <Link className="ghost-btn" to="/search">
              Run Search
            </Link>
          </div>
        </div>

        <div className="hero-side">
          <div className="stat-strip">
            <div className="mini-stat">
              <strong>{weapons.length || "--"}</strong>
              <span>Weapons Indexed</span>
            </div>
            <div className="mini-stat">
              <strong>{categories.length || "--"}</strong>
              <span>Categories Online</span>
            </div>
          </div>

          <div className="tactical-card">
            <span className="tactical-card__label">Current Upgrade</span>
            <h2 className="tactical-card__title">Modernized React Command Deck</h2>
            <p className="panel-copy">
              The old pages are now folded into a routed SPA with faster state
              updates, live search, and cleaner mobile navigation.
            </p>
            <ul className="tactical-card__list">
              <li>Weapon cards with backend-served images</li>
              <li>Animated stat panels for detail pages</li>
              <li>Category-first discovery and live filtering</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="section-head">
          <div>
            <h2>Featured Weapons</h2>
            <p>Fast access to the first three available weapon profiles.</p>
          </div>
          <div className="section-actions">
            <Link className="ghost-btn" to="/weapons">
              View Full Grid
            </Link>
          </div>
        </div>

        {weaponsLoading ? (
          <LoadingPanel label="Syncing featured weapon cards..." />
        ) : (
          <div className="weapon-grid">
            {featuredWeapons.map((weapon) => (
              <WeaponCard key={weapon.weapon_id} weapon={weapon} />
            ))}
          </div>
        )}
      </section>

      <section className="page-section">
        <div className="section-head">
          <div>
            <h2>Category Access</h2>
            <p>Old category buttons, rebuilt as responsive navigation cards.</p>
          </div>
          <div className="section-actions">
            <Link className="ghost-btn" to="/categories">
              All Categories
            </Link>
          </div>
        </div>

        {categoriesLoading ? (
          <LoadingPanel label="Loading category map..." />
        ) : (
          <div className="category-grid">
            {categories.slice(0, 4).map((category) => {
              const count = weapons.filter(
                (weapon) => weapon.category_name === category.category_name,
              ).length;

              return (
                <CategoryCard
                  key={category.category_id}
                  category={category}
                  count={count}
                />
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}

export default HomePage;

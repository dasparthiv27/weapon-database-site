import CategoryCard from "../components/CategoryCard";
import ErrorPanel from "../components/ErrorPanel";
import LoadingPanel from "../components/LoadingPanel";
import useCategories from "../hooks/useCategories";
import useWeapons from "../hooks/useWeapons";

function CategoriesPage() {
  const { categories, loading, error } = useCategories();
  const { weapons } = useWeapons();

  return (
    <>
      <section className="glass-panel fade-rise">
        <div className="section-head">
          <div>
            <h2>Weapon Categories</h2>
            <p>
              The original category menu, upgraded into a faster, responsive
              command board.
            </p>
          </div>
          <span className="status-pill">{categories.length} categories</span>
        </div>
      </section>

      {loading ? <LoadingPanel label="Loading category matrix..." /> : null}
      {error ? <ErrorPanel message={error} /> : null}

      {!loading && !error ? (
        <section className="page-section category-grid">
          {categories.map((category) => {
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
        </section>
      ) : null}
    </>
  );
}

export default CategoriesPage;

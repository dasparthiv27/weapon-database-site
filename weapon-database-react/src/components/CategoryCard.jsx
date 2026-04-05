import { Link } from "react-router-dom";
import useUiSounds from "../hooks/useUiSounds";

function CategoryCard({ category, count }) {
  const { playClick, playHover } = useUiSounds();

  return (
    <Link
      to={`/weapons?category=${category.category_id}`}
      className="category-card fade-rise"
      onClick={playClick}
      onMouseEnter={playHover}
    >
      <div className="category-card__title-row">
        <div>
          <span className="badge">Category</span>
          <h3>{category.category_name}</h3>
        </div>
        <span className="status-pill">{count} weapons</span>
      </div>

      <p className="panel-copy">
        Filter the live arsenal and jump straight into detailed loadout stats.
      </p>

      <div className="card-footer">
        <span>Open list</span>
        <span>Operational</span>
      </div>
    </Link>
  );
}

export default CategoryCard;

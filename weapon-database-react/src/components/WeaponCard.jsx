import { Link } from "react-router-dom";
import useUiSounds from "../hooks/useUiSounds";
import { DEFAULT_WEAPON_IMAGE_PATH, getWeaponImage } from "../utils/getWeaponImage";

function WeaponCard({ weapon }) {
  const { playClick, playHover } = useUiSounds();
  console.log("Loading image:", weapon.image);

  return (
    <Link
      to={`/weapon/${weapon.weapon_id}`}
      className="weapon-card fade-rise"
      onClick={playClick}
      onMouseEnter={playHover}
    >
      <div className="weapon-card__media">
        <img
          src={getWeaponImage(weapon.image)}
          alt={weapon.weapon_name}
          loading="lazy"
          decoding="async"
          onError={(event) => {
            event.currentTarget.src = DEFAULT_WEAPON_IMAGE_PATH;
          }}
        />
      </div>

      <div className="weapon-card__title-row">
        <div>
          <h3>{weapon.weapon_name}</h3>
          <p className="meta-copy">
            {weapon.category_name || "Field-classified platform"}
          </p>
        </div>
        <span className="badge">{weapon.units_available} units</span>
      </div>

      <div className="meta-grid">
        <div className="meta-grid__item">
          <span>Damage</span>
          <strong>{weapon.damage}</strong>
        </div>
        <div className="meta-grid__item">
          <span>Fire Rate</span>
          <strong>{weapon.fire_rate}</strong>
        </div>
        <div className="meta-grid__item">
          <span>Range</span>
          <strong>{weapon.range_value}</strong>
        </div>
        <div className="meta-grid__item">
          <span>Mobility</span>
          <strong>{weapon.mobility}</strong>
        </div>
      </div>

      <div className="card-footer">
        <span>Tap for full specs</span>
        <span>{weapon.reload_time}s reload</span>
      </div>
    </Link>
  );
}

export default WeaponCard;

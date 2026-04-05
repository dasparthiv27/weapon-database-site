import { useEffect, useState } from "react";
import { DEFAULT_WEAPON_IMAGE_PATH, getWeaponImage } from "./utils/getWeaponImage";

const ENV_BASE_URL = import.meta.env.VITE_API_BASE_URL?.trim();
const BASE_URL = ENV_BASE_URL || "https://weapon-database-site.onrender.com";

function WeaponList() {
  const [weapons, setWeapons] = useState([]);

  useEffect(() => {
    const loadWeapons = async () => {
      try {
        const res = await fetch(`${BASE_URL}/weapons`);
        const data = await res.json();
        setWeapons(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("API failed:", error);
        setWeapons([]);
      }
    };

    loadWeapons();
  }, []);

  return (
    <div>
      {weapons.length === 0 ? (
        <p>Loading...</p>
      ) : (
        weapons.map((weapon, index) => (
          <div key={weapon.weapon_id || index}>
            <h3>{weapon.weapon_name}</h3>
            {console.log("IMAGE PATH:", weapon.image)}
            <img
              src={getWeaponImage(weapon.image)}
              alt={weapon.weapon_name}
              width="200"
              onError={(event) => {
                event.currentTarget.src = DEFAULT_WEAPON_IMAGE_PATH;
              }}
            />
          </div>
        ))
      )}
    </div>
  );
}

export default WeaponList;

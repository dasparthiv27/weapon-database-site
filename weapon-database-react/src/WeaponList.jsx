import { useEffect, useState } from "react";

const ENV_BASE_URL = import.meta.env.VITE_API_BASE_URL?.trim();
const BASE_URL = ENV_BASE_URL || "https://weapon-database-site.onrender.com";

const getImageUrl = (img) => {
  const normalized = String(img || "").replace(/\\/g, "/").replace(/^\/+/, "");

  if (!normalized) {
    return "";
  }
  if (normalized.startsWith("http://") || normalized.startsWith("https://")) {
    return normalized;
  }
  if (normalized.startsWith("images/")) {
    return `${BASE_URL}/${normalized}`;
  }
  if (normalized.startsWith("frontend/images/")) {
    return `${BASE_URL}/${normalized.replace(/^frontend\//, "")}`;
  }
  if (normalized.startsWith("weapons/")) {
    return `${BASE_URL}/images/${normalized}`;
  }
  return `${BASE_URL}/images/weapons/${normalized}`;
};

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
              src={getImageUrl(weapon.image)}
              alt={weapon.weapon_name}
              width="200"
            />
          </div>
        ))
      )}
    </div>
  );
}

export default WeaponList;

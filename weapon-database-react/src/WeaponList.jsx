import { useEffect, useState } from "react";

const BASE_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:3000"
    : "http://192.168.20.4:3000";

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
    fetch(`${BASE_URL}/weapons`)
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA:", data); // debug
        setWeapons(data);
      })
      .catch((err) => console.error("ERROR:", err));
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

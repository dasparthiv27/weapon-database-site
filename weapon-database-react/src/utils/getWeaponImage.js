const DEFAULT_WEAPON_IMAGE = "/images/weapons/default.png";

export const getWeaponImage = (imageName) => {
  try {
    const normalized = String(imageName || "")
      .trim()
      .replace(/\\/g, "/")
      .split("/")
      .filter(Boolean)
      .pop()
      ?.toLowerCase()
      .replace(/\s+/g, "-");

    if (!normalized) {
      return DEFAULT_WEAPON_IMAGE;
    }

    return `/images/weapons/${normalized}`;
  } catch {
    return DEFAULT_WEAPON_IMAGE;
  }
};

export const DEFAULT_WEAPON_IMAGE_PATH = DEFAULT_WEAPON_IMAGE;

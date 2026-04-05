export const BASE_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:3000"
    : "http://192.168.20.4:3000";

const IMAGE_FALLBACK =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="480" height="280" viewBox="0 0 480 280">
      <rect width="480" height="280" rx="24" fill="#06111c"/>
      <rect x="24" y="24" width="432" height="232" rx="18" fill="#0d1b28" stroke="#4cf38d" stroke-opacity="0.22"/>
      <text x="240" y="148" text-anchor="middle" fill="#90ffbf" font-family="Arial, sans-serif" font-size="24">
        Asset Offline
      </text>
    </svg>
  `);

export function getImageUrl(img, folder = "weapons") {
  const normalized = String(img || "").replace(/\\/g, "/").replace(/^\/+/, "");

  if (!normalized) {
    return IMAGE_FALLBACK;
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
  if (normalized.startsWith(`${folder}/`)) {
    return `${BASE_URL}/images/${normalized}`;
  }
  return `${BASE_URL}/images/${folder}/${normalized}`;
}

export async function fetchJson(pathname) {
  const response = await fetch(`${BASE_URL}${pathname}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export { IMAGE_FALLBACK };

const ENV_BASE_URL = import.meta.env.VITE_API_BASE_URL?.trim();
const FALLBACK_BASE_URL = "https://weapon-database-site.onrender.com";

export const BASE_URL = ENV_BASE_URL || FALLBACK_BASE_URL;

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
  if (!BASE_URL) {
    return IMAGE_FALLBACK;
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
  try {
    const response = await fetch(`${BASE_URL}${pathname}`);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("API failed:", error);
    throw new Error("API is currently unavailable.");
  }
}

export async function requestJson(pathname, options = {}) {
  try {
    const response = await fetch(`${BASE_URL}${pathname}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    if (response.status === 204) {
      return null;
    }

    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      return response.json();
    }

    return response.text();
  } catch (error) {
    console.error("API failed:", error);
    throw new Error("API is currently unavailable.");
  }
}

export { IMAGE_FALLBACK };

import { useEffect, useState } from "react";
import { fetchJson } from "../lib/api";

export default function useWeapons() {
  const [weapons, setWeapons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    fetchJson("/weapons")
      .then((data) => {
        if (!active) {
          return;
        }
        setWeapons(Array.isArray(data) ? data : []);
        setError("");
      })
      .catch((err) => {
        if (!active) {
          return;
        }
        setError(err.message || "Unable to load weapons.");
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return { weapons, loading, error };
}

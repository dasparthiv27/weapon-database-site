import { useEffect, useState } from "react";
import { fetchJson } from "../lib/api";

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    fetchJson("/categories")
      .then((data) => {
        if (!active) {
          return;
        }
        setCategories(Array.isArray(data) ? data : []);
        setError("");
      })
      .catch((err) => {
        if (!active) {
          return;
        }
        setError(err.message || "Unable to load categories.");
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

  return { categories, loading, error };
}

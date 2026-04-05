import { useEffect, useState } from "react";

function AnimatedStatBar({ label, value }) {
  const [width, setWidth] = useState(0);
  const safeValue = Math.max(0, Math.min(100, Number(value) || 0));

  useEffect(() => {
    const id = window.setTimeout(() => setWidth(safeValue), 80);
    return () => window.clearTimeout(id);
  }, [safeValue]);

  return (
    <div className="stat-row">
      <div className="stat-row__top">
        <span>{label}</span>
        <strong>{safeValue}</strong>
      </div>
      <div className="stat-track" aria-hidden="true">
        <div className="stat-fill" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

export default AnimatedStatBar;

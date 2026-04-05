function LoadingPanel({ label = "Loading intel..." }) {
  return (
    <div className="loading-panel">
      <div className="spinner" />
      <p>{label}</p>
    </div>
  );
}

export default LoadingPanel;

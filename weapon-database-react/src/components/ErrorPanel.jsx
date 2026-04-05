function ErrorPanel({ message = "Something went wrong." }) {
  return (
    <div className="error-panel">
      <span
        className="badge"
        style={{ color: "#ffb3b3", borderColor: "rgba(255,127,127,0.3)" }}
      >
        Signal lost
      </span>
      <p style={{ marginTop: "14px", color: "#ffb3b3" }}>{message}</p>
    </div>
  );
}

export default ErrorPanel;

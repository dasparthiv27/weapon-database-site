function AdminWeaponForm({
  form,
  categories,
  attachments,
  pending,
  submitLabel,
  onChange,
  onAttachmentToggle,
  onSubmit,
}) {
  return (
    <form className="glass-panel" onSubmit={onSubmit}>
      <div
        style={{
          display: "grid",
          gap: "16px",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        <label className="admin-field">
          <span>Weapon Name</span>
          <input name="weapon_name" value={form.weapon_name} onChange={onChange} required />
        </label>

        <label className="admin-field">
          <span>Image Filename</span>
          <input
            name="image"
            value={form.image}
            onChange={onChange}
            placeholder="ak47.png"
            required
          />
        </label>

        <label className="admin-field">
          <span>Damage</span>
          <input name="damage" type="number" value={form.damage} onChange={onChange} required />
        </label>

        <label className="admin-field">
          <span>Fire Rate</span>
          <input name="fire_rate" type="number" value={form.fire_rate} onChange={onChange} required />
        </label>

        <label className="admin-field">
          <span>Range</span>
          <input
            name="range_value"
            type="number"
            value={form.range_value}
            onChange={onChange}
            required
          />
        </label>

        <label className="admin-field">
          <span>Accuracy</span>
          <input name="accuracy" type="number" value={form.accuracy} onChange={onChange} required />
        </label>

        <label className="admin-field">
          <span>Mobility</span>
          <input name="mobility" type="number" value={form.mobility} onChange={onChange} required />
        </label>

        <label className="admin-field">
          <span>Magazine Size</span>
          <input
            name="magazine_size"
            type="number"
            value={form.magazine_size}
            onChange={onChange}
            required
          />
        </label>

        <label className="admin-field">
          <span>Reload Time</span>
          <input
            name="reload_time"
            type="number"
            step="0.01"
            value={form.reload_time}
            onChange={onChange}
            required
          />
        </label>

        <label className="admin-field">
          <span>Units Available</span>
          <input
            name="units_available"
            type="number"
            value={form.units_available}
            onChange={onChange}
            required
          />
        </label>

        <label className="admin-field">
          <span>Category</span>
          <select name="category_id" value={form.category_id} onChange={onChange} required>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.category_id} value={String(category.category_id)}>
                {category.category_name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ marginTop: "24px" }}>
        <h3 style={{ marginBottom: "12px" }}>Attachments</h3>
        <div
          style={{
            display: "grid",
            gap: "12px",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          }}
        >
          {attachments.map((attachment) => {
            const attachmentId = String(attachment.attachment_id);

            return (
              <label key={attachmentId} className="admin-field">
                <span style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <input
                    type="checkbox"
                    checked={form.attachments.includes(attachmentId)}
                    onChange={() => onAttachmentToggle(attachmentId)}
                  />
                  {attachment.attachment_name}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end" }}>
        <button className="primary-btn" type="submit" disabled={pending}>
          {pending ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default AdminWeaponForm;

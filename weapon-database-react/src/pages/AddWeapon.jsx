import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminWeaponForm from "../components/AdminWeaponForm";
import ErrorPanel from "../components/ErrorPanel";
import LoadingPanel from "../components/LoadingPanel";
import { fetchJson, requestJson } from "../lib/api";

const EMPTY_FORM = {
  weapon_name: "",
  image: "",
  damage: "",
  fire_rate: "",
  range_value: "",
  accuracy: "",
  mobility: "",
  magazine_size: "",
  reload_time: "",
  units_available: "",
  category_id: "",
  attachments: [],
};

function AddWeapon() {
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY_FORM);
  const [categories, setCategories] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([fetchJson("/categories"), fetchJson("/attachments")])
      .then(([categoryData, attachmentData]) => {
        setCategories(Array.isArray(categoryData) ? categoryData : []);
        setAttachments(Array.isArray(attachmentData) ? attachmentData : []);
      })
      .catch((err) => {
        setError(err.message || "Unable to load form options.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleAttachmentToggle = (attachmentId) => {
    setForm((current) => ({
      ...current,
      attachments: current.attachments.includes(attachmentId)
        ? current.attachments.filter((id) => id !== attachmentId)
        : [...current.attachments, attachmentId],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPending(true);
    setError("");

    try {
      await requestJson("/weapons", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          image: String(form.image || "").trim(),
        }),
      });
      navigate("/admin/weapons", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to create weapon.");
    } finally {
      setPending(false);
    }
  };

  if (loading) {
    return <LoadingPanel label="Loading add weapon form..." />;
  }

  return (
    <section className="page-section fade-rise">
      <div className="section-head">
        <div>
          <h1>Add Weapon</h1>
          <p>This admin form placeholder is active and ready for the full create flow.</p>
        </div>
        <Link className="ghost-btn" to="/admin/weapons">
          Back to Weapons
        </Link>
      </div>

      {error ? <ErrorPanel message={error} /> : null}

      <AdminWeaponForm
        form={form}
        categories={categories}
        attachments={attachments}
        pending={pending}
        submitLabel="Create Weapon"
        onChange={handleChange}
        onAttachmentToggle={handleAttachmentToggle}
        onSubmit={handleSubmit}
      />
    </section>
  );
}

export default AddWeapon;

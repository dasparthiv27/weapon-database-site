import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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

function EditWeapon() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY_FORM);
  const [categories, setCategories] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([fetchJson(`/weapons/${id}`), fetchJson("/categories"), fetchJson("/attachments")])
      .then(([weapon, categoryData, attachmentData]) => {
        const categoryList = Array.isArray(categoryData) ? categoryData : [];
        const attachmentList = Array.isArray(attachmentData) ? attachmentData : [];
        const selectedAttachments = attachmentList
          .filter((attachment) =>
            String(weapon?.attachments || "")
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
              .includes(attachment.attachment_name),
          )
          .map((attachment) => String(attachment.attachment_id));

        setCategories(categoryList);
        setAttachments(attachmentList);
        setForm({
          weapon_name: weapon?.weapon_name || "",
          image: weapon?.image || "",
          damage: weapon?.damage ?? "",
          fire_rate: weapon?.fire_rate ?? "",
          range_value: weapon?.range_value ?? "",
          accuracy: weapon?.accuracy ?? "",
          mobility: weapon?.mobility ?? "",
          magazine_size: weapon?.magazine_size ?? "",
          reload_time: weapon?.reload_time ?? "",
          units_available: weapon?.units_available ?? "",
          category_id: weapon?.category_id ? String(weapon.category_id) : "",
          attachments: selectedAttachments,
        });
      })
      .catch((err) => {
        setError(err.message || "Unable to load weapon.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleAttachmentToggle = (attachmentId) => {
    setForm((current) => ({
      ...current,
      attachments: current.attachments.includes(attachmentId)
        ? current.attachments.filter((item) => item !== attachmentId)
        : [...current.attachments, attachmentId],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPending(true);
    setError("");

    try {
      await requestJson(`/weapons/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...form,
          image: String(form.image || "").trim(),
        }),
      });
      navigate("/admin/weapons", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to update weapon.");
    } finally {
      setPending(false);
    }
  };

  if (loading) {
    return <LoadingPanel label="Loading weapon editor..." />;
  }

  if (error && !form.weapon_name) {
    return <ErrorPanel message={error} />;
  }

  return (
    <section className="page-section fade-rise">
      <div className="section-head">
        <div>
          <h1>Edit Weapon</h1>
          <p>Editing record ID: {id}</p>
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
        submitLabel="Save Changes"
        onChange={handleChange}
        onAttachmentToggle={handleAttachmentToggle}
        onSubmit={handleSubmit}
      />
    </section>
  );
}

export default EditWeapon;

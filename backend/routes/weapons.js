const express = require("express");
const router = express.Router();
const db = require("../db");

function normalizeAttachments(input) {
  if (!input) {
    return [];
  }

  const values = Array.isArray(input) ? input : [input];

  return values
    .map((value) => Number.parseInt(value, 10))
    .filter((value) => Number.isInteger(value) && value > 0);
}

function sendDbError(res, err, message) {
  console.error(message, err);
  return res.status(500).json({ error: message });
}

router.get("/", (req, res) => {
  const query = `SELECT
    w.weapon_id,
    w.weapon_name,
    w.damage,
    w.fire_rate,
    w.range_value,
    w.accuracy,
    w.mobility,
    w.magazine_size,
    w.reload_time,
    w.units_available,
    w.image,
    w.category_id,
    wc.category_name
  FROM weapons w
  LEFT JOIN weapon_category wc
    ON w.category_id = wc.category_id
  ORDER BY w.weapon_id`;

  db.query(query, (err, results) => {
    if (err) {
      return sendDbError(res, err, "Unable to load weapons.");
    }

    return res.json(results);
  });
});

router.get("/:id", (req, res) => {
  const weaponId = req.params.id;

  const query = `SELECT
    w.weapon_id,
    w.weapon_name,
    w.damage,
    w.fire_rate,
    w.range_value,
    w.accuracy,
    w.mobility,
    w.magazine_size,
    w.reload_time,
    w.units_available,
    w.image,
    w.category_id,
    wc.category_name,
    GROUP_CONCAT(a.attachment_name ORDER BY a.attachment_name SEPARATOR ', ') AS attachments,
    GROUP_CONCAT(a.attachment_id ORDER BY a.attachment_name SEPARATOR ',') AS attachment_ids
  FROM weapons w
  LEFT JOIN weapon_category wc
    ON w.category_id = wc.category_id
  LEFT JOIN weapon_attachments wa
    ON w.weapon_id = wa.weapon_id
  LEFT JOIN attachments a
    ON wa.attachment_id = a.attachment_id
  WHERE w.weapon_id = ?
  GROUP BY
    w.weapon_id,
    w.weapon_name,
    w.damage,
    w.fire_rate,
    w.range_value,
    w.accuracy,
    w.mobility,
    w.magazine_size,
    w.reload_time,
    w.units_available,
    w.image,
    w.category_id,
    wc.category_name`;

  db.query(query, [weaponId], (err, results) => {
    if (err) {
      return sendDbError(res, err, "Unable to load weapon details.");
    }

    if (!results.length) {
      return res.status(404).json({ error: "Weapon not found." });
    }

    return res.json(results[0]);
  });
});

router.post("/", (req, res) => {
  const {
    weapon_name,
    image,
    damage,
    fire_rate,
    range_value,
    accuracy,
    mobility,
    magazine_size,
    reload_time,
    units_available,
    category_id,
    attachments,
  } = req.body;

  const query = `INSERT INTO weapons
    (weapon_name, image, damage, fire_rate, range_value, accuracy, mobility, magazine_size, reload_time, units_available, category_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    query,
    [
      weapon_name,
      image || "default.png",
      damage,
      fire_rate,
      range_value,
      accuracy,
      mobility,
      magazine_size,
      reload_time,
      units_available,
      category_id || null,
    ],
    (insertErr, result) => {
      if (insertErr) {
        return sendDbError(res, insertErr, "Unable to create weapon.");
      }

      const weaponId = result.insertId;
      const normalizedAttachments = normalizeAttachments(attachments);

      if (!normalizedAttachments.length) {
        return res.status(201).json({ weapon_id: weaponId, message: "Weapon created successfully." });
      }

      const values = normalizedAttachments.map((attachmentId) => [weaponId, attachmentId]);

      db.query(
        "INSERT INTO weapon_attachments (weapon_id, attachment_id) VALUES ?",
        [values],
        (attachmentErr) => {
          if (attachmentErr) {
            return sendDbError(res, attachmentErr, "Weapon created but attachments could not be saved.");
          }

          return res.status(201).json({ weapon_id: weaponId, message: "Weapon created successfully." });
        },
      );
    },
  );
});

router.put("/:id", (req, res) => {
  const weaponId = req.params.id;
  const {
    weapon_name,
    image,
    damage,
    fire_rate,
    range_value,
    accuracy,
    mobility,
    magazine_size,
    reload_time,
    units_available,
    category_id,
    attachments,
  } = req.body;

  const query = `UPDATE weapons
    SET weapon_name = ?, image = ?, damage = ?, fire_rate = ?, range_value = ?, accuracy = ?, mobility = ?, magazine_size = ?, reload_time = ?, units_available = ?, category_id = ?
    WHERE weapon_id = ?`;

  db.query(
    query,
    [
      weapon_name,
      image || "default.png",
      damage,
      fire_rate,
      range_value,
      accuracy,
      mobility,
      magazine_size,
      reload_time,
      units_available,
      category_id || null,
      weaponId,
    ],
    (updateErr, result) => {
      if (updateErr) {
        return sendDbError(res, updateErr, "Unable to update weapon.");
      }

      if (!result.affectedRows) {
        return res.status(404).json({ error: "Weapon not found." });
      }

      db.query("DELETE FROM weapon_attachments WHERE weapon_id = ?", [weaponId], (deleteErr) => {
        if (deleteErr) {
          return sendDbError(res, deleteErr, "Weapon updated but attachments could not be refreshed.");
        }

        const normalizedAttachments = normalizeAttachments(attachments);

        if (!normalizedAttachments.length) {
          return res.json({ message: "Weapon updated successfully." });
        }

        const values = normalizedAttachments.map((attachmentId) => [weaponId, attachmentId]);

        db.query(
          "INSERT INTO weapon_attachments (weapon_id, attachment_id) VALUES ?",
          [values],
          (attachmentErr) => {
            if (attachmentErr) {
              return sendDbError(res, attachmentErr, "Weapon updated but attachments could not be saved.");
            }

            return res.json({ message: "Weapon updated successfully." });
          },
        );
      });
    },
  );
});

router.delete("/:id", (req, res) => {
  const weaponId = req.params.id;

  db.query("DELETE FROM weapon_attachments WHERE weapon_id = ?", [weaponId], (attachmentErr) => {
    if (attachmentErr) {
      return sendDbError(res, attachmentErr, "Unable to delete weapon attachments.");
    }

    db.query("DELETE FROM weapons WHERE weapon_id = ?", [weaponId], (deleteErr, result) => {
      if (deleteErr) {
        return sendDbError(res, deleteErr, "Unable to delete weapon.");
      }

      if (!result.affectedRows) {
        return res.status(404).json({ error: "Weapon not found." });
      }

      return res.json({ message: "Weapon deleted successfully." });
    });
  });
});

module.exports = router;

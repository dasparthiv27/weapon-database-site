const express = require("express");
const router = express.Router();
const db = require("../db");

/* GET ALL WEAPONS */

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
wc.category_name
FROM weapons w
LEFT JOIN weapon_category wc 
ON w.category_id = wc.category_id
ORDER BY w.weapon_id`;

db.query(query, (err, results) => {

if (err) {
console.error(err);
return res.status(500).json({ error: "Database error" });
}

res.json(results);

});

});

/* GET SINGLE WEAPON DETAILS */

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
wc.category_name,
GROUP_CONCAT(a.attachment_name) AS attachments
FROM weapons w
LEFT JOIN weapon_category wc 
ON w.category_id = wc.category_id
LEFT JOIN weapon_attachments wa 
ON w.weapon_id = wa.weapon_id
LEFT JOIN attachments a
ON wa.attachment_id = a.attachment_id
WHERE w.weapon_id = ?
GROUP BY w.weapon_id`;

db.query(query, [weaponId], (err, result) => {

if (err) {
console.error(err);
return res.status(500).json(err);
}

res.json(result[0]);

});

});

module.exports = router;

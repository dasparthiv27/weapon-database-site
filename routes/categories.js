const express = require("express");
const router = express.Router();
const db = require("../db");

/* GET ALL CATEGORIES */

router.get("/", (req, res) => {

const query = `SELECT 
category_id,
category_name
FROM weapon_category
ORDER BY category_name`;

db.query(query, (err, results) => {

if (err) {
console.error("Category fetch error:", err);
return res.status(500).json({ error: "Database error" });
}

res.json(results);

});

});

/* GET WEAPONS BY CATEGORY */

router.get("/:id", (req, res) => {

const categoryId = req.params.id;

const query = `SELECT
weapon_id,
weapon_name,
damage,
fire_rate,
range_value,
accuracy,
mobility,
magazine_size,
reload_time,
units_available,
image
FROM weapons
WHERE category_id = ?
ORDER BY weapon_name`;

db.query(query, [categoryId], (err, results) => {

if (err) {
console.error("Category weapons error:", err);
return res.status(500).json({ error: "Database error" });
}

res.json(results);

});

});

module.exports = router;

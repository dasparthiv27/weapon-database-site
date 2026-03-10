const express = require("express");
const router = express.Router();
const db = require("../db");

/* GET ALL EQUIPMENT */

router.get("/", (req, res) => {

const query = `SELECT 
equipment_id,
equipment_name,
image
FROM equipment
ORDER BY equipment_name`;

db.query(query, (err, results) => {

if (err) {
console.error("Equipment fetch error:", err);
return res.status(500).json({ error: "Database error" });
}

res.json(results);

});

});

/* ADD EQUIPMENT */

router.post("/add", (req, res) => {

const { equipment_name, image } = req.body;

if (!equipment_name) {
return res.status(400).json({ error: "Equipment name required" });
}

const query = `INSERT INTO equipment (equipment_name, image)
VALUES (?, ?)`;

db.query(query, [equipment_name, image], (err) => {

if (err) {
console.error("Equipment insert error:", err);
return res.status(500).json({ error: "Insert failed" });
}

res.json({ message: "Equipment added successfully" });

});

});

/* UPDATE EQUIPMENT */

router.put("/update/:id", (req, res) => {

const equipmentId = req.params.id;
const { equipment_name, image } = req.body;

const query = `UPDATE equipment
SET equipment_name = ?, image = ?
WHERE equipment_id = ?`;

db.query(query, [equipment_name, image, equipmentId], (err) => {

if (err) {
console.error("Equipment update error:", err);
return res.status(500).json({ error: "Update failed" });
}

res.json({ message: "Equipment updated successfully" });

});

});

/* DELETE EQUIPMENT */

router.delete("/delete/:id", (req, res) => {

const equipmentId = req.params.id;

const query = `DELETE FROM equipment
WHERE equipment_id = ?`;

db.query(query, [equipmentId], (err) => {

if (err) {
console.error("Equipment delete error:", err);
return res.status(500).json({ error: "Delete failed" });
}

res.json({ message: "Equipment deleted successfully" });

});

});

module.exports = router;

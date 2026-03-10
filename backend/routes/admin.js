const express = require("express");
const router = express.Router();
const db = require("../db");
const upload = require("../upload");

/* ADD WEAPON */

router.post("/add-weapon", upload.single("weapon_image"), (req, res) => {

const {
weapon_name,
damage,
fire_rate,
range_value,
accuracy,
mobility,
magazine_size,
reload_time,
units_available,
category_id
} = req.body;

let attachments = req.body.attachments || [];

if (!Array.isArray(attachments)) {
attachments = [attachments];
}

/* uploaded image */

const image = req.file ? req.file.filename : "default.png";

const weaponQuery = `INSERT INTO weapons
(weapon_name, damage, fire_rate, range_value, accuracy, mobility, magazine_size, reload_time, units_available, category_id, image)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

db.query(
weaponQuery,
[
weapon_name,
damage,
fire_rate,
range_value,
accuracy,
mobility,
magazine_size,
reload_time,
units_available,
category_id,
image
],
(err, result) => {

if (err) {
console.error(err);
return res.status(500).json({ error: "Weapon insert failed" });
}

const weaponId = result.insertId;

/* insert attachments */

if (attachments.length === 0) {
return res.json({ message: "Weapon added successfully" });
}

const values = attachments.map(attId => [weaponId, attId]);

const attachmentQuery = `INSERT INTO weapon_attachments (weapon_id, attachment_id)
VALUES ?`;

db.query(attachmentQuery, [values], (err) => {

if (err) {
console.error(err);
return res.status(500).json({ error: "Attachment insert failed" });
}

res.json({ message: "Weapon added with attachments" });

});

});
});

/* DELETE WEAPON */

router.delete("/delete-weapon/:id", (req, res) => {

const weaponId = req.params.id;

const deleteAttachments = "DELETE FROM weapon_attachments WHERE weapon_id = ?";
const deleteWeapon = "DELETE FROM weapons WHERE weapon_id = ?";

db.query(deleteAttachments, [weaponId], (err) => {

if (err) {
return res.status(500).json(err);
}

db.query(deleteWeapon, [weaponId], (err) => {

if (err) {
return res.status(500).json(err);
}

res.json({ message: "Weapon deleted successfully" });

});

});

});

/* UPDATE WEAPON */

router.put("/update-weapon/:id", (req, res) => {

const weaponId = req.params.id;

const {
weapon_name,
damage,
fire_rate,
range_value,
accuracy,
mobility,
magazine_size,
reload_time,
units_available,
attachments
} = req.body;

const updateWeapon = `UPDATE weapons
SET weapon_name=?, damage=?, fire_rate=?, range_value=?, accuracy=?, mobility=?, magazine_size=?, reload_time=?, units_available=?
WHERE weapon_id=?`;

db.query(
updateWeapon,
[
weapon_name,
damage,
fire_rate,
range_value,
accuracy,
mobility,
magazine_size,
reload_time,
units_available,
weaponId
],
(err) => {

if (err) {
return res.status(500).json(err);
}

/* remove old attachments */

db.query(
"DELETE FROM weapon_attachments WHERE weapon_id=?",
[weaponId],
(err) => {

if (err) {
return res.status(500).json(err);
}

/* add new attachments */

let att = attachments || [];

if (!Array.isArray(att)) {
att = [att];
}

if (att.length === 0) {
return res.json({ message: "Weapon updated" });
}

const values = att.map(a => [weaponId, a]);

db.query(
"INSERT INTO weapon_attachments (weapon_id, attachment_id) VALUES ?",
[values],
(err) => {

if (err) {
return res.status(500).json(err);
}

res.json({ message: "Weapon updated successfully" });

});

});

});

});

module.exports = router;
/* ADMIN LOGIN */

router.post("/login",(req,res)=>{

const {username,password}=req.body;

/* simple credentials */

const ADMIN_USER="admin";
const ADMIN_PASS="securepassword123";

if(username===ADMIN_USER && password===ADMIN_PASS){

return res.json({success:true});

}

res.json({success:false});

});

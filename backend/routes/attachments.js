const express = require("express");
const router = express.Router();
const db = require("../db");

/* GET ALL ATTACHMENTS */

router.get("/", (req, res) => {

const query = `SELECT 
attachment_id,
attachment_name
FROM attachments
ORDER BY attachment_name`;

db.query(query, (err, results) => {

if (err) {
console.error("Attachment fetch error:", err);
return res.status(500).json({ error: "Database error" });
}

res.json(results);

});

});

module.exports = router;

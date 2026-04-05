const mysql = require("mysql2");

const db = mysql.createConnection({
host: "127.0.0.1",
user: "root",
password: "dasparthiv",
database: "dasdb",
port: 3306
});

db.connect((err) => {
if (err) {
console.error("Database connection failed:", err);
return;
}

console.log("Connected to MySQL Database");
});

module.exports = db;

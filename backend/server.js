const express = require("express");
const cors = require("cors");

const weaponsRoutes = require("./routes/weapons");
const categoriesRoutes = require("./routes/categories");
const adminRoutes = require("./routes/admin");
const attachmentsRoutes = require("./routes/attachments");
const equipmentRoutes = require("./routes/equipment");

const app = express();

/* MIDDLEWARE */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ROUTES */

app.use("/weapons", weaponsRoutes);
app.use("/categories", categoriesRoutes);
app.use("/admin", adminRoutes);
app.use("/attachments", attachmentsRoutes);
app.use("/equipment", equipmentRoutes);

/* SERVER */

const PORT = 3000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});

const express = require("express");
const cors = require("cors");
const path = require("path");

const weaponsRoutes = require("./routes/weapons");
const categoriesRoutes = require("./routes/categories");
const adminRoutes = require("./routes/admin");
const attachmentsRoutes = require("./routes/attachments");
const equipmentRoutes = require("./routes/equipment");

const app = express();
const PORT = process.env.PORT || 3000;
const staticImagesPath = path.resolve(__dirname, "..", "frontend", "images");

app.use(
  cors({
    origin: true,
    credentials: false,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(staticImagesPath));

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/weapons", weaponsRoutes);
app.use("/categories", categoriesRoutes);
app.use("/admin", adminRoutes);
app.use("/attachments", attachmentsRoutes);
app.use("/equipment", equipmentRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Serving images from: ${staticImagesPath}`);
});

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const hospitalRoutes = require("./routes/Hospital.Router");
require("dotenv").config();
// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// Routes setup
app.use("/api", hospitalRoutes);

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log("Connected to MongoDB");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log("Server is running on port " + PORT);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Imports dyal Routes
const cvRoutes = require('./routes/cvRoutes');
const aiRoutes = require('./routes/aiRoutes');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Darori bach y-fhem l-JSON (Dernaha gha mra whda)

// Base Route
app.get("/", (req, res) => {
  res.send("Smart CV Builder API is running");
});

// 🚀 API Routes (Khasshom darori ykouno hna, 9bel app.listen)
app.use('/api/cv', cvRoutes);
app.use('/api/ai', aiRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
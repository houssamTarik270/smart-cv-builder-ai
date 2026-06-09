const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport"); // ✅ Import darori li kān na9ssk
const connectDB = require("./config/db");
const authRoutes = require('./routes/authRoutes');

// 1. Configuration dyal l-bi'a
dotenv.config();

// 2. Connect to MongoDB [cite: 217]
connectDB();

const app = express();

// 3. Middlewares Asasiyin
app.use(cors());
app.use(express.json()); // Bach l-server y-fhem l-JSON data [cite: 214]

// 4. Passport Middleware (Darori y-koun 9bel l-Routes)
require('./services/passport'); // 🔗 K-y-rbet l-logic dyal Google Strategy
app.use(passport.initialize());

// 5. API Routes [cite: 209]
// Kolla route m-kh-se-sa l-7aja kifma m-tloub f l-project structure [cite: 320, 327]
app.use('/api/auth', require('./routes/authRoutes')); // Auth (Login/Register/Google) [cite: 210]
app.use('/api/cv', require('./routes/cvRoutes'));     // CV Management [cite: 211]
app.use('/api/ai', require('./routes/aiRoutes'));     // AI Integration [cite: 212]

// 6. Base Route
app.get("/", (req, res) => {
  res.send("Smart CV Builder API is running 🚀");
});

// 7. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

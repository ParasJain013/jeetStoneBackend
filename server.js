const express = require('express');
const bodyParser = require('body-parser');
const appRoutes = require('./routes/appRoutes');
const adminRoutes = require('./routes/adminRouter');
const contactRoutes = require('./routes/contactRoutes');
const cors = require("cors");
require('dotenv').config();

const app = express();

// 🧩 Request Logger (concise + safe)
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });

  next();
});

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://faguna-stones.vercel.app",
    "https://www.jeetstoneindustries.in",
    "https://api.cron-job.org"
  ],
  credentials: true
}));

// Middleware
app.use(bodyParser.json());

// 🧱 Route Mappings
app.use('/api/admin', adminRoutes);
app.use('/api/app', appRoutes);
app.use('/api/contact', contactRoutes);

// 🕒 Cron Health Check Endpoint
app.get('/cron', (req, res) => {
  console.log("🕒 CRON endpoint hit at", new Date().toISOString());
  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send('✅ Cron executed successfully at ' + new Date().toISOString());
});

// 🧩 Error Handling Middleware (for debugging crashes)
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err.message);
  res.status(500).json({ error: "Internal Server Error", details: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

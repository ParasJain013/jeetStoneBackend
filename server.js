const express = require('express');
const bodyParser = require('body-parser');
const appRoutes = require('./routes/appRoutes');
const adminRoutes = require('./routes/adminRouter');
const contactRoutes = require('./routes/contactRoutes');
const cors = require("cors");
require('dotenv').config();

const app = express();
// app.use((req, res, next) => {
//   console.log("Incoming request:", {
//     method: req.method,
//     url: req.originalUrl,
//     origin: req.headers.origin,
//     ip: req.ip
//   });
//   next();
// });

app.use(cors({
  origin: ["http://localhost:5173","https://faguna-stones.vercel.app", "https://www.jeetstoneindustries.in", "https://api.cron-job.org"],
  credentials: true
}));
// Middleware
app.use(bodyParser.json());


app.use('/api/admin', adminRoutes);
app.use('/api/app', appRoutes);
app.use('/api/contact', contactRoutes);
app.get('/cron', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

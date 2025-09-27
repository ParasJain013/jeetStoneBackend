const express = require('express');
const bodyParser = require('body-parser');
const appRoutes = require('./routes/appRoutes');
const adminRoutes = require('./routes/adminRouter');
const cors = require("cors");
require('dotenv').config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
// Middleware
app.use(bodyParser.json());


app.use('/api/admin', adminRoutes);
app.use('/api/app', appRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

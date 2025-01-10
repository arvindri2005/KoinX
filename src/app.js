const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const schedule = require("node-schedule");
const fetchCryptoData = require("./jobs/fetchCryptoData");
const deviationRoute = require("./routes/deviation");
const statsRoute = require("./routes/stats");

dotenv.config();
const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

  
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

// Use stats route
app.use(statsRoute);

// Use deviation route
app.use(deviationRoute);

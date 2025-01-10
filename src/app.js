const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const schedule = require("node-schedule");
const fetchCryptoData = require("./jobs/fetchCryptoData");
const deviationRoute = require("./routes/deviation");
const statsRoute = require("./routes/stats");

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

schedule.scheduleJob("0 */2 * * *", fetchCryptoData);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

app.use(statsRoute);

app.use(deviationRoute);

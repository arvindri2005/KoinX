const express = require("express");
const CryptoData = require("../models/CryptoData");
const router = express.Router();

// Add this middleware to parse JSON bodies
router.use(express.json());

router.get("/stats", async (req, res) => {
  const { coin } = req.body;
  
  try {
    const data = await CryptoData.findOne({ coin }).sort({ timestamp: -1 });
    if (!data) {
      return res.status(404).json({ error: "No data found for the requested coin." });
    }

    res.json({
      price: data.price,
      marketCap: data.marketCap,
      "24hChange": data.change24h,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
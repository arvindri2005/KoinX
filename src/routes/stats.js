const express = require("express");
const CryptoData = require("../models/CryptoData");
const router = express.Router();

// Add this middleware to parse JSON bodies
router.use(express.json());

router.get("/stats", async (req, res) => {
  const { coin } = req.body;
  
  try {

    // Find the latest data for the requested coin
    const data = await CryptoData.findOne({ coin }).sort({ timestamp: -1 });

    // If no data is found, return a 404 error
    if (!data) {
      return res.status(404).json({ error: "No data found for the requested coin." });
    }

    // Return the price, market cap, and 24h change
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
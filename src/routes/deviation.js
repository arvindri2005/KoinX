const express = require("express");
const CryptoData = require("../models/CryptoData");
const { std } = require("mathjs");
const router = express.Router();

router.get("/deviation", async (req, res) => {

    const { coin } = req.body;

    try {
        const data = await CryptoData.find({ coin }).sort({ timestamp: -1 }).limit(12);
        if (!data.length) {
        return res.status(404).json({ error: "Not enough data for the requested coin." });
        }

        const prices = data.map((record) => record.price);
        const deviation = std(prices);

        res.json({ deviation: deviation.toFixed(2) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
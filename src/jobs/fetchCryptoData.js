const axios = require("axios");
const CryptoData = require("../models/CryptoData");

const fetchCryptoData = async () => {
  try {
    const coins = ["bitcoin", "matic-network", "ethereum"];
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-Uq34yFSHqvk18T5q9sscoD3f' }
    };

    for (const coin of coins) {
      const url = `https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`;
      const response = await axios.get(url, options);
      const data = response.data;

      const record = new CryptoData({
        coin,
        price: data.market_data.current_price.usd,
        marketCap: data.market_data.market_cap.usd,
        change24h: data.market_data.price_change_percentage_24h,
      });
      await record.save();
    }

    console.log("Data fetched and saved successfully!");
  } catch (error) {
    console.error("Error fetching crypto data:", error.message);
  }
};

module.exports = fetchCryptoData;
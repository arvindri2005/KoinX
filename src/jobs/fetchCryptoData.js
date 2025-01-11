const axios = require("axios");
const CryptoData = require("../models/CryptoData");
const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

const fetchCryptoData = async () => {

    try {
        // Connect to MongoDB
        mongoose.connect("mongodb+srv://arvindri2005:123Asdf@cluster0.wqzau.mongodb.net", { useNewUrlParser: true, useUnifiedTopology: true })
          

         mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

        // List of coins to fetch data for
        const coins = ["bitcoin", "matic-network", "ethereum"];

        const options = {
        method: 'GET',
        headers: { accept: 'application/json', 'x-cg-demo-api-key': process.env.API_KEY },
        };

        // Fetch data for each coin
        for (const coin of coins) {
        const url = `https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`;
        const response = await axios.get(url, options);
        const data = response.data;

        // Save the data to the database
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
        
    } finally {
        mongoose.connection.close();
    }
};

fetchCryptoData();

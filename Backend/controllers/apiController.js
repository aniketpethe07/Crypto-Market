// const fetch = require("node-fetch"); // Import node-fetch module

// const homePageApi = async (req, res) => {
//   try {
//     const response = await fetch(
//       "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
//     );
//     const data = await response.json();
//     res.json(data);
//     // console.log(data);
//   } catch (error) {
//     console.error("Error fetching crypto data:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// const infoPageApi = async (req, res) => {
//   try {
//     const id = req.query.id;
//     const response = await fetch(
//       `https://api.coingecko.com/api/v3/coins/${id}`
//     );
//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     console.error("Error fetching crypto data:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// module.exports = { homePageApi, infoPageApi }; // Export as an object

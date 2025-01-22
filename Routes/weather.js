const express = require("express");
const router = express.Router();
const { fetchWeather } = require("../Controller/apiConfig");

router.get("/:city", async (req, res) => {
  const city = req.params.city;
  const weatherData = await fetchWeather(city);
  res.send(weatherData);
});

module.exports = router;
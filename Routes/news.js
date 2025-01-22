const express = require("express");
const router = express.Router();
const { fetchNews } = require("../Controller/apiConfig");

router.get("/", async (req, res) => {
  const newsData = await fetchNews();
  res.send(newsData);
});

module.exports = router;

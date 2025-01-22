const axios = require("axios");

async function fetchWeather(city) {
  const apiKey = process.env.VISUALCROSSING_API_KEY;

  try {
    // Fetch weather data using Visual Crossing Weather API
    const response = await axios.get(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}`,
      {
        params: {
          unitGroup: "metric", 
          include: "current",
          key: apiKey, 
          contentType: "json", 
        },
      }
    );

    const data = response.data;

    // Extract current weather details
    const currentWeather = data.currentConditions;
    return `Weather in ${city}: ${currentWeather.conditions}, Temperature: ${currentWeather.temp.toFixed(2)}°C`;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return "Error fetching weather data. Please try again.";
  }
}


async function fetchNews() {
  const apiKey = process.env.NEWSAPI_KEY;
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    const articles = response.data.articles.slice(0, 5); // Top 5 news headlines
    return articles
      .map((article, index) => `${index + 1}. ${article.title}`)
      .join("\n");
  } catch (error) {
    console.error("Error fetching news:", error);
    return "Error fetching news. Please try again.";
  }
}

module.exports = { fetchWeather, fetchNews };
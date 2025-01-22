const axios = require("axios");
const Groq = require("groq-sdk");
const { fetchWeather, fetchNews } = require("./apiConfig");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


async function parseCommand(userInput) {
  try {
    console.log("User input:", userInput);

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant capable of fetching weather, retrieving news, solving arithmetic expressions, and setting reminders.",
        },
        {
          role: "user",
          content: userInput,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    let command = response.choices[0]?.message?.content.trim();
    // console.log("Parsed command:", command);

    if (/what is|calculate/i.test(command)) {
      const expressionMatch = command.match(/what is (.+)/i) || command.match(/calculate (.+)/i);
      const expression = expressionMatch ? expressionMatch[1].trim() : null;

      if (expression) {
        return await calculateExpression(expression);
      } else {
        return "Please provide a valid arithmetic expression (e.g., 'What is 1+2?').";
      }
    } else if (/weather/i.test(command)) {
        const cityMatch = command.match(/weather in (.+)/i) || command.match(/temperature in (.+)/i) || command.match(/temperature (.+)/i) || command.match(/weather (.+)/i);
        const city = cityMatch ? cityMatch[1].trim() : null;
        if (city) {
          return await fetchWeather(city);
        } else {
          return "Please specify a city (e.g., 'Get weather in London').";
        }
    }
    else if (/news/i.test(command)) {
      return await fetchNews();
    } 
    else {
      return command;
    }
    // else {
    //   // let command = response.choices[0]?.message?.content.trim();
    //   console.log("Parsed command:", command);
    // }
  } catch (error) {
    console.error("Error with Llama:", error);
    return "An error occurred while processing your command.";
  }
}


async function calculateExpression(expression) {
  try {
    expression = expression.replace(/= .+$/, '').trim();

    const result = eval(expression);
    return `Result: ${result}`;
  } catch (error) {
    console.error("Error calculating expression:", error);
    return "Error processing the calculation. Please try again.";
  }
}


module.exports = { parseCommand };

require("dotenv").config();
const express = require("express");
const readline = require("readline");
const { parseCommand } = require("./Controller/LamaConfig");
const app = express();
const PORT = 3000;

app.use(express.json());

const weatherRoute = require("./Routes/weather");
const newsRoute = require("./Routes/news");

app.use("/weather", weatherRoute);
app.use("/news", newsRoute);


app.listen(PORT, () => {
  console.log(`Agentic Al is running on PORT ${PORT}`);
  startCLI();
});

// CLI input setup
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Starts the CLI for user input.
 */
function startCLI() {
  console.log("\nWelcome to Agentic Al CLI!");
  console.log("Type your command (e.g., 'Get weather in London', 'solve 1+3' or 'Give top Headline News') or 'exit' to quit.\n");

  rl.on("line", async (input) => {
    if (input.toLowerCase() === "exit") {
      console.log("Goodbye!");
      rl.close();
      process.exit(0);
    }

    console.log("Processing your command...");
    const response = await parseCommand(input); // Send the command to Llama
    console.log(`Response: ${response}\n`);
    console.log("Enter your next command or type 'exit' to quit.");
  });
}

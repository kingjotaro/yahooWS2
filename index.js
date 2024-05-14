import Run from "./main.js";
import fs from "fs";

async function executeForTickers() {
  const tickersFilePath = `./${process.env.REMAINING_TICKERS}.txt`;
  const failedTickers = [];

  const data = fs.readFileSync(tickersFilePath, "utf-8");
  const tickers = data
    .split(",")
    .map((ticker) => ticker.trim().replace(/"/g, ""));

  for (const ticker of tickers) {
    let retryCount = 0;
    let success = false;

    while (!success && retryCount < 1) {
      try {
        await Run(`${ticker}.SA`);
        success = true;
      } catch (error) {
        console.error(`Error executing ${ticker}. Retry ${retryCount + 1}`);
        retryCount++;
      }
    }

    if (!success) {
      console.error(`Failed to execute ${ticker} after ${retryCount} retries.`);
      failedTickers.push(ticker);
    }
  }

  if (failedTickers.length > 0) {
    console.log("The following tickers failed:");
    for (const failedTicker of failedTickers) {
      console.log(failedTicker);
    }
  } else {
    console.log("All tickers were processed successfully.");
  }
}

executeForTickers();

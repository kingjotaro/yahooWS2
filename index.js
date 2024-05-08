import Run from "./main.js";
import tickers from './ticker.js';

async function executeForTickers() {
    const failedTickers = []; // Array to store failed tickers

    for (let tickerIndex = 0; tickerIndex < tickers.length; tickerIndex++) {
        const ticker = tickers[tickerIndex];
        let retryCount = 0;
        let success = false;

        while (!success && retryCount < 2) {
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
            failedTickers.push(ticker); // Add the failed ticker to the array
        }
    }

    // Print failed tickers at the end
    if (failedTickers.length > 0) {
        console.log('The following tickers failed:');
        for (const failedTicker of failedTickers) {
            console.log(failedTicker);
        }
    } else {
        console.log('All tickers were processed successfully.');
    }
}

executeForTickers();

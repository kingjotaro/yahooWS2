import puppeteer from "puppeteer";
import extractDate from "./functions/extractDate.js";
import formatDateString from "./functions/formatDateString.js";
import insertStartDate from "./functions/insertStartDate.js"
import clickDateButton from "./functions/clickDateButton.js"

async function Run(ticker) {
  // Launch the browser
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();

  // Open the page
  const url = `https://finance.yahoo.com/quote/${ticker}/history`;
  await page.goto(url);

  // Click the button to open the date selector
  await clickDateButton(page)

  await insertStartDate(page,"01011900")
  console.log("Fake data inserted")



  // Wait for a second to ensure the page finishes loading
  await sleep(1000);

  // Capture the text of the element and filter only the mentioned dates
  console.log("True initial date", await extractDate(page));

  const trueDate = await extractDate(page)
  console.log(await formatDateString(trueDate))

  await page.keyboard.press('Escape');

  // Click the button to open the date selector
  await clickDateButton(page)
  await insertStartDate(page, await formatDateString(trueDate))
}

// Function to wait for a specified time
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

Run("PETR4.SA");

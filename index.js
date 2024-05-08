import puppeteer from "puppeteer";
import extractDate from "./functions/extractDate.js";
import formatDateString from "./functions/formatDateString.js";

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
  const dataButtonXPath =
    '//*[@id="nimbus-app"]/section/section/section/article/div[1]/div[1]/div[1]/button';
  const dataButton = await page.waitForXPath(dataButtonXPath);
  await dataButton.click();

  console.log("Date button clicked");

  // Insert the start date
  const startDateInputXPath =
    "/html/body/div[1]/main/section/section/section/article/div[1]/div[1]/div[1]/div/div/div[2]/section/div[2]/input[1]";
  const startDateInput = await page.waitForXPath(startDateInputXPath);
  await startDateInput.click();
  await startDateInput.focus();
  await startDateInput.type("01011900");

  console.log("Fake initial date inserted");

  // Wait for a second to ensure the page finishes loading
  await sleep(1000);

  // Capture the text of the element and filter only the mentioned dates
  console.log("True initial date", await extractDate(page));

  const trueDate = await extractDate(page)
  console.log(await formatDateString(trueDate))

}

// Function to wait for a specified time
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

Run("PETR4.SA");

import puppeteer from "puppeteer";
import extractDate from "./functions/extractDate.js";
import formatDateString from "./functions/formatDateString.js";
import insertStartDate from "./functions/insertStartDate.js";
import clickDateButton from "./functions/clickDateButton.js";

// Defina o limite máximo em milissegundos
const maxPageLifetime = 70000; // 60 segundos

async function Run(ticker) {
  // Launch the browser
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();

  // Defina um temporizador para fechar a página após o tempo limite
  const pageCloseTimer = setTimeout(async () => {
    console.log("Limite máximo de tempo excedido. Fechando a página...");
    await page.close();
    await browser.close();
  }, maxPageLifetime);

  // Open the page
  const url = `https://finance.yahoo.com/quote/${ticker}/history`;
  await page.goto(url);

  // Click the button to open the date selector
  await clickDateButton(page);

  // Insert fake start date
  await insertStartDate(page, "01011900");
  console.log("Fake data inserted");

  // Wait for a second to ensure the page finishes loading
  await sleep(1000);

  // Capture the text of the element and filter only the mentioned dates
  console.log("True initial date", await extractDate(page));

  // Format the extracted date
  const trueDate = await extractDate(page);
  console.log(await formatDateString(trueDate));

  // Press the Escape key to close any active dialogs
  await page.keyboard.press("Escape");

  // Reopen the date selector and insert the true date
  await clickDateButton(page);
  await insertStartDate(page, await formatDateString(trueDate));

  // Click to find selected data
  const donePath = '/html/body/div[1]/main/section/section/section/article/div[1]/div[1]/div[1]/div/div/div[2]/section/div[3]/button[1]';
  const donePathLoad = await page.waitForXPath(donePath);
  await donePathLoad.click();

  // Click to download the data
  const downloadPath = '/html/body/div[1]/main/section/section/section/article/div[1]/div[2]/div/a/span';
  const downloadPathLoad = await page.waitForXPath(downloadPath);
  await sleep(2000)
  await downloadPathLoad.click();

  console.log(`Download order sent for ${ticker}\n---------------------------------------\n---------------------------------------`);

  // Cancela o temporizador, pois a ação foi bem-sucedida
  clearTimeout(pageCloseTimer);

  await sleep(3000);
  await browser.close();
}

// Function to wait for a specified time
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default Run;

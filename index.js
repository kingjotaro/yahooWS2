import puppeteer from "puppeteer";
import extractDate from "./functions/extractDate.js";
import formatDateString from "./functions/formatDateString.js"

async function Run(ticker) {
  // Inicia o navegador
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();

  // Abre a página
  const url = `https://finance.yahoo.com/quote/${ticker}/history`;
  await page.goto(url);

  // Clica no botão para abrir o seletor de data
  const dataButtonXPath =
    '//*[@id="nimbus-app"]/section/section/section/article/div[1]/div[1]/div[1]/button';
  const dataButton = await page.waitForXPath(dataButtonXPath);
  await dataButton.click();

  console.log("Date button clicked");

  // Insere a data de início
  const startDateInputXPath =
    "/html/body/div[1]/main/section/section/section/article/div[1]/div[1]/div[1]/div/div/div[2]/section/div[2]/input[1]";
  const startDateInput = await page.waitForXPath(startDateInputXPath);
  await startDateInput.click();
  await startDateInput.focus();
  await startDateInput.type("01011900");

  console.log("Fake initial date inserted");

  // Aguarda um segundo para garantir que a página termine de carregar
  await sleep(1000);

  // Captura o texto do elemento e filtra apenas as datas mencionadas
  
  console.log("True initial date", await extractDate(page));

  const trueDate = await extractDate(page)
  console.log(await formatDateString(trueDate))

}

// Função para aguardar um determinado tempo
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

Run("PETR4.SA");

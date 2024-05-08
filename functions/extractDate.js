async function extractDate(page) {
  // text element path
  const trueInitialDate = await page.$(".container.svelte-grkcsd");
  const text = await trueInitialDate.evaluate((element) => element.textContent);
  
  // data filter
  const dates = text.match(/"([^"]*)"/g).join(", ");
  return dates;
}

export default extractDate;
async function insertStartDate(page, startDate) {
    const startDateInputXPath =
      "/html/body/div[1]/main/section/section/section/article/div[1]/div[1]/div[1]/div/div/div[2]/section/div[2]/input[1]";
    const startDateInput = await page.waitForXPath(startDateInputXPath);
    await startDateInput.click();
    await startDateInput.focus();
    await startDateInput.type(startDate);

    
  }
  
export default insertStartDate;
  
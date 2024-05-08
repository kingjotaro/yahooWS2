async function clickDateButton(page) {
    const dataButtonXPath =
      '//*[@id="nimbus-app"]/section/section/section/article/div[1]/div[1]/div[1]/button';
    const dataButton = await page.waitForXPath(dataButtonXPath);
    await dataButton.click();
    console.log("Date button clicked");
  }

export default clickDateButton;
  

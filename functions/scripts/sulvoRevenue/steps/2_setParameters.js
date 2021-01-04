/**
 * This function sets the parameters of the report
 * @param {object} I - The I object for codecept script
 * @param {string} reportType - The type of the report. You can set another type of report
 * @param {string} emailId - The email id where the report will be send
 */
exports.setParameters = async ({ page, reportType, emailId }) => {
  /** Date selector */
  await page.click('button[class="picker"]');
  await page.click('button[class="preset"] >> text=Today');
  /** choose the type of the report */
  await page.click('input[id="reportTypeInput"]');
  switch (reportType) {
    case 'campaign':
      /** UTM selector
       * Clears which are not needed
       * Choose the needed one
       */
      await setUtmCampaignOptions({ page });
      break;
    case 'device':
      /**Dimensions Device */
      await setDeviceOptions({ page });
      break;
    case 'domain':
      /**Dimensions Device */
      await setDeviceOptions({ page });
      break;
    case 'country':
      /**Dimensions Country */
      await setCountryOptions({ page });
      break;
  }
  /** email where the report is going */
  await page.fill(
    'input[placeholder="Add user email"]',
    `sulvo.${reportType}.reports+${emailId}@robust.digital`
  );
  await page.click('button >> text=Send');
};

const setUtmCampaignOptions = async ({ page }) => {
  await page.click('li >> text=UTM');
  const text = await page.$eval('div[class="vue-treeselect__control"]', (el) =>
    el.innerText.trim()
  );
  console.log(text);
  if (text !== 'Select UTM...') {
    await page.click('svg[class="vue-treeselect__x"]');
  }
  await page.click('div[class="vue-treeselect__value-container"]');
  await page.click('text="utm_campaign"');
  //Unit test
  console.log('setUtmCampaignOptions function OK');
};

const setCountryOptions = async ({ page }) => {
  await page.click('li >> text=Dimensions');
  await page.click('div[class="vue-treeselect__value-container"]');
  await page.click('text=Country');
  //Unit test
  console.log('setCountryOptions function OK');
};

const setDeviceOptions = async ({ page }) => {
  await page.click('li >> text=Dimensions');
  await page.click('div[class="vue-treeselect__value-container"]');
  await page.click('text="Device type"');
  //Unit test
  console.log('setDeviceOptions function OK');
};

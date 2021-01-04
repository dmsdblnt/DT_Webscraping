const playwright = require('playwright');
const { getReportRules } = require('./steps/0_getReportRules');
const {
  getCredentialsByAccount,
} = require('./steps/1_getCredentialsByAccount');
const { setParameters } = require('./steps/2_setParameters');
const { errorHandling } = require('./../../utils/errorHandling/index.js');

(async () => {
  console.log('itt?');
  let reportRuleIds = [];
  let type = '';
  if (
    process.env.reportRuleId !== undefined &&
    process.env.reportRuleId !== ''
  ) {
    reportRuleIds = process.env.reportRuleId.split(',');
  }
  if (process.env.type !== undefined && process.env.type !== '') {
    type = process.env.type;
  }
  //0.: Get all or only requested reportRules
  let reportRules = await getReportRules({ reportRuleIds, type });
  const sanitizedReportRules = reportRules.map((rr) => {
    return { account: rr.account, provider: rr.provider, type: rr.type };
  });
  //1.: Get credentials by accounts from reportRules
  const credentials = await getCredentialsByAccount({ sanitizedReportRules });

  reportRules.map((rule) => {
    rule.credentials = credentials.filter((cred) => {
      return cred.userName === rule.account && cred.type === rule.type;
    })[0];
  });

  for (let i = 0; i < reportRules.length; i++) {
    console.log(
      `${i}. reportRule: account: ${reportRules[i].account}, type: ${reportRules[i].type}`
    );
    await errorHandling({
      func,
      reportRule: reportRules[i],
      type: reportRules[i].type,
    });
  }
})();

const func = async ({ credentials }) => {
  const browser = await playwright.chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  //go to page
  await page.goto('https://surge.sulvo.com/');
  //login
  await page.type('input[name="email"]', credentials.userName);
  await page.type('input[name="password"]', credentials.password);
  await page.click('button[class="button !px-10 primary"]');
  //click REPORTS
  await page.click('a[href="/reports"]');
  //New Report
  await page.click('text="New Report"');
  await page.waitForTimeout(2000);

  //2.: set the parameters
  await setParameters({
    page,
    reportType: credentials.type,
    emailId: credentials.emailId,
  });

  await browser.close();
};

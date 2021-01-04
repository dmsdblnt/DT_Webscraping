Scenario(`Check DOM elements`, async (I) => {
  /** Login with given username and password */
  I.login(credentials[i].userName, credentials[i].password);
  /**See and click REPORTS */
  I.see('REPORTS');
  I.click('REPORTS');
  I.wait(2);
  /**See and click New Report */
  I.see('New Report');
  I.click('New Report');
  I.see('Run Now');
  /**See Period and its input field */
  I.see('Period');
  I.see('button[class="picker"]');
  /**See Report type and its input field */
  I.see('Report type');
  I.see('input[id="reportTypeInput"]');
  /**Switch to UTM */
  I.click('input[id="reportTypeInput"]');
  I.click(locate('li').withText('UTM'));
  /** See Parameters and Email */
  I.see('Parameters');
  I.see('Email');
  I.see('input[id="toAddressInput"]');
  /** Close new report */
  I.click('button[class="absolute w-12 h-full top-0 right-0 outline-none"]');
  /**Logout */
  I.click(
    'span[class="inline-block py-1 leading-10 font-gotham text-sm whitespace-no-wrap"]'
  );
  I.click(locate('li[class="select-option"]').at(4));
});

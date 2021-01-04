// in this file you can append custom step methods to 'I' object

module.exports = function () {
  return actor({
    login: async function ({ url, userName, password }) {
      await this.amOnPage(url);
      await this.fillField('input[name="email"]', userName);
      await this.fillField('input[name="password"]', password);
      await this.click('Login');
    },
  });
};

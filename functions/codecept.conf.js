const { setHeadlessWhen } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// HEADLESS=true npx codecept run
//setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: './scripts/**/*.script.js',
  output: './output',
  helpers: {
    Playwright: {
      url: 'https://surge.sulvo.com',
      show: false,
      browser: 'chromium',
      disableScreenshots: true, // don't store screenshots on failure
      windowSize: '1200x1000', // set window size dimensions
      waitForAction: 1000, // increase timeout for clicking
      waitForNavigation: 'domcontentloaded', // wait for document to load
      chrome: {
        args: ['--no-sandbox'], // IMPORTANT! Browser can't be run without this!
      },
    },
  },
  // Once a tests are finished - send back result via HTTP
  /*bootstrap: function (done) {
    console.log('Do some pretty suite setup stuff');
    done(); // Don't forget to call done()
  },
  teardown: (done) => {
    res.send(`Finished...`);
    done();
  },*/
  include: {
    I: './steps_file.js',
  },
  mocha: {},
  name: 'sulvo',
  plugins: {
    retryFailedStep: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
    },
  },
};

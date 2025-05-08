const assert = require("assert");
const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fetch = require("node-fetch");
require("chromedriver");

describe("Login Test:", function () {
  const driver = new webdriver.Builder()
    .forBrowser("chrome")
    .setChromeOptions(driverOptions())
    .build();
  before(async function () {
    await driver.get("https://qaplayground.dev/apps/iframe/");
  });
  after(async function () {
    await driver.close();
  });
  beforeEach(async function () {});
  afterEach(async function () {});
  it("Click Me Button", async function () {
    // get the element for the CLICK ME button

    // get the text of the CLICK ME button and print it to console
    let text: string;
    console.log(`Printing the text of the button: ${text}`);
  });
});

function driverOptions() {
  const options = new chrome.Options();
  options.setChromeBinaryPath("/usr/bin/google-chrome");
  options.addArguments("--headless");
  options.addArguments("--disable-dev-shm-usage");
  options.addArguments("--no-sandbox");
  options.setUserPreferences({
    "profile.default_content_settings": { images: 2 },
  });
  return options;
}

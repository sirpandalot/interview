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
    await driver.get("http://localhost:8080");
  });
  after(async function () {
    await driver.close();
  });
  beforeEach(async function () {});
  afterEach(async function () {});
  it("Should return 'Invalid credentials'", async function () {
    await driver.findElement(webdriver.By.id("")).sendKeys("");
    await driver.findElement(webdriver.By.id("")).click();
    const loginResponse = await driver
      .findElement(webdriver.By.id("message"))
      .getText();
    assert.deepStrictEqual(
      loginResponse,
      "Invalid credentials",
      `Login text found: ${loginResponse}`
    );
  });
  it("Should return 'Welcome, testuser'", async function () {
    await driver.findElement(webdriver.By.id("username")).clear();
    await driver.findElement(webdriver.By.id("username")).sendKeys("testuser");
    await driver
      .findElement(webdriver.By.id("password"))
      .sendKeys("password123");
    await driver.findElement(webdriver.By.id("login")).click();
    const loginResponse = await driver
      .findElement(webdriver.By.id("message"))
      .getText();
    assert.deepStrictEqual(
      loginResponse,
      "Welcome, testuser",
      `Login text found: ${loginResponse}`
    );
  });
  it("Should return users list", async function () {
    const userList = await get("http://localhost:8080/users");
    assert.deepStrictEqual(
      userList.users,
      ["bob", "alice"],
      `Users found: ${userList}`
    );
  });
});

async function get(url) {
  const response = (await fetch(url)).json();
  return response;
}

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

const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  const url = "http://search.adamscountysheriff.org/inmatesearch.php";
  await page.goto(url);

  const SEARCH_LAST_NAME_SELECTOR = 'input[name="lastname"]';
  const SEARCH_SUBMIT_SELECTOR = 'input[name="submitsearch"]';
  const INMATE_SELECTOR = ".backgroundGradient";

  await page.type(SEARCH_LAST_NAME_SELECTOR, "a");
  await page.click(SEARCH_SUBMIT_SELECTOR);

  await page.waitForSelector(INMATE_SELECTOR);

  page.on("domcontentloaded", async () => {
    const results = await page.$$eval(INMATE_SELECTOR, (nodes) =>
      nodes.map((n) => n.innerText)
    );
    console.log(results);
    console.log(`${results.length} inmates found.`);
    await browser.close();
  });
})();

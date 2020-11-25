const playwright = require('playwright');

(async () => {
	const browser = await playwright['chromium'].launch();
	const context = await browser.newContext();
	const page = await context.newPage();
	const url = 'http://search.adamscountysheriff.org/inmatesearch.php'
	await page.goto(url);

	const SEARCH_LAST_NAME_SELECTOR = 'input[name="lastname"]'
	const SEARCH_SUBMIT_SELECTOR = 'input[name="submitsearch"]'
	// const INMATE_SELECTOR = 'table[summary="inmate search header"]'
	const INMATE_SELECTOR = '.backgroundGradient'

	await page.click(SEARCH_LAST_NAME_SELECTOR)
	await page.keyboard.type('a')
	await page.click(SEARCH_SUBMIT_SELECTOR)

	await page.waitForSelector(INMATE_SELECTOR)

	const results = await page.$(INMATE_SELECTOR)
	console.log(results, results.length)
        const text = await results.evaluate(element => element.innerText);
        console.log(text);

	await page.screenshot({ path: 'inmates.png' })

	await browser.close();
})();

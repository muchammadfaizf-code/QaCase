const assert = require('assert');
const { By } = require('selenium-webdriver');
const { createBrowser } = require('../../config/browser');
const env = require('../../config/env');
const HazardReportPage = require('../pages/hazardReportPage');

const suite = env.baseUrl ? describe : describe.skip;

suite('TS_HAZARD_02 - Safety Hazard Report', function () {
	let driver;
	let hazard;

	beforeEach(async function () {
		driver = await createBrowser();
		hazard = new HazardReportPage(driver, env.timeout);
		await driver.get(env.baseUrl);
	});

	afterEach(async function () {
		if (driver) await driver.quit();
	});

	it('TC_HAZARD_002 keeps dependent selectors unavailable before a location is selected', async function () {
		await hazard.open();
		const sublocation = await driver.findElement(By.css("select[name='sublocation'], [name='sublocation']"));
		const area = await driver.findElement(By.css("select[name='area'], [name='area']"));
		assert.strictEqual(await sublocation.isEnabled(), false);
		assert.strictEqual(await area.isEnabled(), false);
	});

	it('TC_HAZARD_003 blocks submission when required fields are empty', async function () {
		await hazard.open();
		await hazard.submit();
		assert.ok((await hazard.validationCount()) > 0);
	});
});

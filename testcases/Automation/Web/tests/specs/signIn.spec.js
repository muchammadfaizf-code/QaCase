const assert = require('assert');
const { By } = require('selenium-webdriver');
const { createBrowser } = require('../../config/browser');
const env = require('../../config/env');
const SignInPage = require('../pages/signInPage');

const suite = env.baseUrl ? describe : describe.skip;

suite('TS_AUTH_00 - Authentication', function () {
	let driver;
	let signIn;

	beforeEach(async function () {
		driver = await createBrowser();
		signIn = new SignInPage(driver, env.timeout);
		await signIn.open(env.baseUrl);
	});

	afterEach(async function () {
		if (driver) await driver.quit();
	});

	it('TC_AUTH_003 rejects an unknown username without opening SSO', async function () {
		await signIn.enterUsername('invalid_user_99');
		await signIn.clickNext();

		const pageText = (await driver.findElement(By.css('body')).getText()).toLowerCase();
		assert.match(pageText, /username|tenant|not found|invalid|error/);
		assert.strictEqual((await driver.findElements(By.css("input[type='password']"))).length, 0);
	});

	it('TC_AUTH_001 completes the configured sign-in path', async function () {
		if (!env.username || !env.password) this.skip();

		await signIn.enterUsername(env.username);
		await signIn.clickNext();
		await signIn.enterPassword(env.password);
		await signIn.submitPassword();

		await driver.wait(async () => !(await driver.getCurrentUrl()).includes('login'), env.timeout);
		assert.notStrictEqual((await driver.getCurrentUrl()).includes('login'), true);
	});
});

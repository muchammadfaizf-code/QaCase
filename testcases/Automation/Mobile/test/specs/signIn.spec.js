const assert = require('assert');
const appHelper = require('../utils/app.helper');
const signInPage = require('../pageObjects/signIn.page');
const signIn = require('../actions/signIn.action');
const credentials = require('../test_data/credentials');

const configured = process.env.MOBILE_APP_CONFIGURED === 'true';
const suite = configured ? describe : describe.skip;

suite('TS_AUTH_00 - Mobile Authentication', function () {
	beforeEach(async function () {
		await appHelper.reset();
		await appHelper.launch();
	});

	afterEach(async function () {
		await appHelper.close();
	});

	it('TC_AUTH_003 rejects an invalid username without opening Microsoft login', async function () {
		await signInPage.enterUsername(credentials.invalidUsername);
		await signInPage.continueToMicrosoftLogin();
		await signInPage.errorMessage.waitForDisplayed();
		assert.strictEqual(await signInPage.password.isDisplayed(), false);
	});

	it('TC_AUTH_001 signs in with valid credentials', async function () {
		if (!credentials.username || !credentials.password) this.skip();
		await signIn.signIn(credentials.username, credentials.password);
		await signInPage.dashboard.waitForDisplayed();
		assert.strictEqual(await signInPage.dashboard.isDisplayed(), true);
	});
});

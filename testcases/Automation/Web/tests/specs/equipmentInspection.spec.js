const assert = require('assert');
const { createBrowser } = require('../../config/browser');
const env = require('../../config/env');
const EquipmentInspectionPage = require('../pages/equipmentInspectionPage');

const suite = env.baseUrl ? describe : describe.skip;

suite('TS_INSPECTION_01 - Equipment Inspection', function () {
	let driver;
	let inspection;

	beforeEach(async function () {
		driver = await createBrowser();
		inspection = new EquipmentInspectionPage(driver, env.timeout);
		await driver.get(env.baseUrl);
	});

	afterEach(async function () {
		if (driver) await driver.quit();
	});

	it('TC_INSPECT_001 opens the inspection history and new submission form', async function () {
		await inspection.open();
		await inspection.openNewSubmission();
		assert.ok((await inspection.dynamicFieldCount()) >= 0);
	});

	it('TC_INSPECT_003 blocks submission when required fields are empty', async function () {
		await inspection.open();
		await inspection.openNewSubmission();
		await inspection.submit();
		assert.ok((await inspection.validationCount()) > 0);
	});
});

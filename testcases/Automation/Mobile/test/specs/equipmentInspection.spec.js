const assert = require('assert');
const appHelper = require('../utils/app.helper');
const equipmentInspectionPage = require('../pageObjects/equipmentInspection.action');
const equipmentInspection = require('../actions/equipmentInspection.action');

const configured = process.env.MOBILE_APP_CONFIGURED === 'true';
const suite = configured ? describe : describe.skip;

suite('TS_INSPECTION_01 - Mobile Equipment Inspection', function () {
	beforeEach(async function () {
		await appHelper.launch();
	});

	afterEach(async function () {
		await appHelper.close();
	});

	it('TC_INSPECT_001 opens the new equipment inspection submission form', async function () {
		await equipmentInspection.openNewSubmission();
		assert.strictEqual(await equipmentInspectionPage.formCode.isDisplayed(), true);
	});

	it('TC_INSPECT_003 blocks submission when required fields are empty', async function () {
		await equipmentInspection.openNewSubmission();
		await equipmentInspection.submitEmptyForm();
		assert.ok((await equipmentInspectionPage.validationMessages).length > 0);
	});
});

const assert = require('assert');
const appHelper = require('../utils/app.helper');
const hazardReportPage = require('../pageObjects/hazardReport.action');
const hazardReport = require('../actions/hazardReport.action');

const configured = process.env.MOBILE_APP_CONFIGURED === 'true';
const suite = configured ? describe : describe.skip;

suite('TS_HAZARD_02 - Mobile Safety Hazard Report', function () {
	beforeEach(async function () {
		await appHelper.launch();
		await hazardReport.openReport();
	});

	afterEach(async function () {
		await appHelper.close();
	});

	it('TC_HAZARD_002 keeps dependent fields unavailable before Location selection', async function () {
		assert.strictEqual(await hazardReportPage.sublocation.isEnabled(), false);
		assert.strictEqual(await hazardReportPage.area.isEnabled(), false);
	});

	it('TC_HAZARD_003 blocks an empty hazard report', async function () {
		await hazardReport.submitEmptyReport();
		assert.ok((await hazardReportPage.validationMessages).length > 0);
	});
});

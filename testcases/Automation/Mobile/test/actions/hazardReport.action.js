const hazardReportPage = require('../pageObjects/hazardReport.action');

module.exports = {
	async openReport() {
		await hazardReportPage.open();
	},

	async submitEmptyReport() {
		await hazardReportPage.submit();
	}
};

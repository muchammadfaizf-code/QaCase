const equipmentInspectionPage = require('../pageObjects/equipmentInspection.action');

module.exports = {
	async openNewSubmission() {
		await equipmentInspectionPage.open();
		await equipmentInspectionPage.openNewSubmission();
	},

	async submitEmptyForm() {
		await equipmentInspectionPage.submit();
	}
};

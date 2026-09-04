class EquipmentInspectionPage {
	get menu() {
		return $('~Equipment Inspection');
	}

	get newSubmissionButton() {
		return $('//*[contains(@text, "New Submission") or @content-desc="New Submission" or @text="+"]');
	}

	get formCode() {
		return $('~Form Code');
	}

	get submitButton() {
		return $('~Submit');
	}

	get validationMessages() {
		return $$('//*[contains(@text, "required") or contains(@content-desc, "required")]');
	}

	async open() {
		await this.menu.click();
	}

	async openNewSubmission() {
		await this.newSubmissionButton.click();
	}

	async submit() {
		await this.submitButton.click();
	}
}

module.exports = new EquipmentInspectionPage();

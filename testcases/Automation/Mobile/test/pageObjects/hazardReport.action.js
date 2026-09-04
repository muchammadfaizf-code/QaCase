class HazardReportPage {
	get hazardMenu() {
		return $('~Hazard');
	}

	get newReportButton() {
		return $('//*[contains(@text, "Report New Hazard") or @content-desc="New Hazard" or @text="+"]');
	}

	get location() {
		return $('~Location');
	}

	get sublocation() {
		return $('~Sublocation');
	}

	get area() {
		return $('~Area');
	}

	get description() {
		return $('~Area Description');
	}

	get evidence() {
		return $('~Evidence');
	}

	get pic() {
		return $('~PIC');
	}

	get submitButton() {
		return $('~Submit');
	}

	get validationMessages() {
		return $$('//*[contains(@text, "required") or contains(@content-desc, "required")]');
	}

	async open() {
		await this.hazardMenu.click();
		await this.newReportButton.click();
	}

	async select(field, value) {
		await field.click();
		await $(`//*[@text="${value}" or @content-desc="${value}"]`).click();
	}

	async submit() {
		await this.submitButton.click();
	}
}

module.exports = new HazardReportPage();

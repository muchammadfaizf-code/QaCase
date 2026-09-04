class SignInPage {
	get username() {
		return $('~Username');
	}

	get nextButton() {
		return $('~Next');
	}

	get password() {
		return $('~Password');
	}

	get signInButton() {
		return $('~Sign in');
	}

	get errorMessage() {
		return $('//*[contains(@text, "not found") or contains(@content-desc, "not found") or contains(@text, "invalid")]');
	}

	get dashboard() {
		return $('//*[contains(@text, "Dashboard") or contains(@content-desc, "Dashboard")]');
	}

	async enterUsername(value) {
		await this.username.setValue(value);
	}

	async continueToMicrosoftLogin() {
		await this.nextButton.click();
	}

	async enterPassword(value) {
		await this.password.waitForDisplayed();
		await this.password.setValue(value);
	}

	async submitPassword() {
		await this.signInButton.click();
	}
}

module.exports = new SignInPage();

const signInPage = require('../pageObjects/signIn.page');

module.exports = {
	async signIn(username, password) {
		await signInPage.enterUsername(username);
		await signInPage.continueToMicrosoftLogin();
		await signInPage.enterPassword(password);
		await signInPage.submitPassword();
	}
};

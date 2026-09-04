const { By, until } = require('selenium-webdriver');
const locators = require('../locators/signIn.locator');

class SignInPage {
	constructor(driver, timeout) {
		this.driver = driver;
		this.timeout = timeout;
	}

	async open(baseUrl) {
		await this.driver.get(baseUrl);
		await this.driver.wait(until.elementLocated(By.css(locators.username)), this.timeout);
	}

	async enterUsername(username) {
		const field = await this.driver.findElement(By.css(locators.username));
		await field.clear();
		await field.sendKeys(username);
	}

	async clickNext() {
		const buttons = await this.driver.findElements(By.css(locators.nextButton));
		for (const button of buttons) {
			if ((await button.getText()).toLowerCase().includes('next')) {
				await button.click();
				return;
			}
		}
		await buttons[0].click();
	}

	async enterPassword(password) {
		const field = await this.driver.wait(until.elementLocated(By.css(locators.password)), this.timeout);
		await field.sendKeys(password);
	}

	async submitPassword() {
		const buttons = await this.driver.findElements(By.css(locators.signInButton));
		for (const button of buttons) {
			if ((await button.getText()).toLowerCase().includes('sign in')) {
				await button.click();
				return;
			}
		}
		await buttons[0].click();
	}
}

module.exports = SignInPage;

const { By, until } = require('selenium-webdriver');
const locators = require('../locators/equipmentInspection.locator');

class EquipmentInspectionPage {
	constructor(driver, timeout) {
		this.driver = driver;
		this.timeout = timeout;
	}

	async open() {
		await this.driver.wait(until.elementLocated(By.xpath(locators.menu)), this.timeout).click();
		await this.driver.wait(until.elementLocated(By.xpath(locators.newSubmission)), this.timeout);
	}

	async openNewSubmission() {
		await this.driver.findElement(By.xpath(locators.newSubmission)).click();
	}

	async selectFormCode(value) {
		const element = await this.driver.findElement(By.css(locators.formCode));
		if ((await element.getTagName()).toLowerCase() === 'select') {
			const options = await element.findElements(By.css(`option[value='${value}']`));
			if (options.length) await options[0].click();
		} else {
			await element.sendKeys(value);
		}
	}

	async dynamicFieldCount() {
		return (await this.driver.findElements(By.css(locators.dynamicFields))).length;
	}

	async submit() {
		await this.driver.findElement(By.css(locators.submit)).click();
	}

	async validationCount() {
		return (await this.driver.findElements(By.css(locators.validation))).length;
	}
}

module.exports = EquipmentInspectionPage;

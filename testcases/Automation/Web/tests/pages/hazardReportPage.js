const { By, until } = require('selenium-webdriver');
const locators = require('../locators/hazardReport.locator');

class HazardReportPage {
	constructor(driver, timeout) {
		this.driver = driver;
		this.timeout = timeout;
	}

	async open() {
		await this.driver.wait(until.elementLocated(By.xpath(locators.menu)), this.timeout).click();
		await this.driver.wait(until.elementLocated(By.xpath(locators.newReport)), this.timeout);
		await this.driver.findElement(By.xpath(locators.newReport)).click();
	}

	async select(field, value) {
		const element = await this.driver.findElement(By.css(locators[field]));
		const tagName = (await element.getTagName()).toLowerCase();
		if (tagName === 'select') {
			const options = await element.findElements(By.css(`option[value='${value}']`));
			if (options.length) await options[0].click();
		} else {
			await element.sendKeys(value);
		}
	}

	async submit() {
		await this.driver.findElement(By.css(locators.submit)).click();
	}

	async validationCount() {
		return (await this.driver.findElements(By.css(locators.validation))).length;
	}
}

module.exports = HazardReportPage;

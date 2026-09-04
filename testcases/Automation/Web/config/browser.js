const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const env = require('./env');

async function createBrowser() {
	const options = new chrome.Options();
	if (env.headless) options.addArguments('--headless=new');
	options.addArguments('--window-size=1440,1000');

	return new Builder()
		.forBrowser('chrome')
		.setChromeOptions(options)
		.build();
}

module.exports = { createBrowser };

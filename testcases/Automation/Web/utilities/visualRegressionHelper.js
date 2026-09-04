const fs = require('fs');
const path = require('path');

async function saveScreenshot(driver, name) {
	const directory = path.resolve(__dirname, '../artifacts/screenshots');
	fs.mkdirSync(directory, { recursive: true });
	const filePath = path.join(directory, `${name}.png`);
	fs.writeFileSync(filePath, await driver.takeScreenshot(), 'base64');
	return filePath;
}

module.exports = { saveScreenshot };

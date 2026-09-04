class AppHelper {
    async launch() {
        await driver.launchApp();
    }

    async close() {
        await driver.closeApp();
    }

    async reset() {
        await driver.reset();
    }
}

module.exports = new AppHelper();
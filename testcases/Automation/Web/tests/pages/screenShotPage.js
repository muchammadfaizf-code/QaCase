const fs = require('fs');
const path = require('path');
const VisualRegressionHelper = require('../../utilities/visualRegressionHelper');

class ScreenshotPage {
    constructor(driver) {
        this.driver = driver;
        this.helper = new VisualRegressionHelper();
    }

    async takeAndCompareFullScreenshot(filename) {
        // Take screenshot using selenium-webdriver
        const screenshotData = await this.driver.takeScreenshot();
        
        // Ensure visual-current directory exists (helper constructor does this, but let's be safe)
        const tempPath = path.join(this.helper.currentDir, `temp_${filename}`);
        fs.writeFileSync(tempPath, screenshotData, 'base64');
        
        // Save as current screenshot
        this.helper.saveCurrentScreenshot(tempPath, filename);
        
        // Clean up temp file
        if (fs.existsSync(tempPath)) {
            fs.unlinkSync(tempPath);
        }

        // If baseline doesn't exist, save this first run as baseline
        if (!this.helper.hasBaseline(filename)) {
            this.helper.saveAsBaseline(filename);
            console.log(`Baseline created for ${filename}. Run again to perform visual comparison.`);
            return;
        }

        // Compare current screenshot with baseline
        const result = await this.helper.compareImages(filename);
        if (!result.match) {
            throw new Error(`Visual comparison failed for ${filename}: ${result.message}`);
        }
    }
}

module.exports = ScreenshotPage;
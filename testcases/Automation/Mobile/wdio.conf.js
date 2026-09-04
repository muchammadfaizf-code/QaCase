const path = require('path');

const configured = process.env.MOBILE_APP_CONFIGURED === 'true';

exports.config = {
  runner: 'local',
  specs: configured ? ['./test/specs/**/*.spec.js'] : [],
  maxInstances: 1,
  logLevel: process.env.WDIO_LOG_LEVEL || 'error',
  bail: 0,
  baseUrl: process.env.APPIUM_URL || 'http://127.0.0.1:4723',
  waitforTimeout: Number(process.env.MOBILE_TIMEOUT || 10000),
  connectionRetryTimeout: 120000,
  connectionRetryCount: 2,
  framework: 'mocha',
  reporters: ['spec', ['allure', { outputDir: 'reports/allure-results' }]],
  services: configured ? ['appium'] : [],
  appium: {
    command: 'appium'
  },
  mochaOpts: {
    timeout: 60000,
    ui: 'bdd'
  },
  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Android Emulator',
    'appium:app': process.env.MOBILE_APP_PATH
      ? path.resolve(process.env.MOBILE_APP_PATH)
      : undefined,
    'appium:appPackage': process.env.APP_PACKAGE,
    'appium:appActivity': process.env.APP_ACTIVITY,
    'appium:autoGrantPermissions': true,
    'appium:newCommandTimeout': 120
  }],
  onPrepare() {
    if (!configured) {
      console.warn('MOBILE_APP_CONFIGURED is not true; Mobile tests will be skipped.');
    }
  }
};

# Mobile Test Automation

The Mobile examples use WebdriverIO, Appium, and the Mocha framework. They map
to the highest-priority manual cases for mobile sign-in, equipment inspection,
and safety hazard reporting.

## Why These Test Tools

### WebdriverIO

WebdriverIO provides the JavaScript test API used to interact with the mobile
application, including element waits, gestures, app lifecycle commands, and
assertions. It fits the existing Node.js project and keeps the test syntax
consistent with the Web automation examples.

### Appium

Appium is used because WeMine is a native mobile application. It drives a real
Android emulator or device through UiAutomator2, allowing the tests to verify
mobile-specific behavior such as app launch, reset, permissions, image input,
offline mode, and cached sessions. These behaviors cannot be verified reliably
with browser-only automation.

### Mocha

Mocha organizes the scenarios into suites that match the manual test-case IDs.
Its hooks provide a clear setup and cleanup lifecycle for launching, resetting,
and closing the application around each scenario.

### Allure Reporter

Allure is included for readable execution reports. Mobile failures often need
device, scenario, and step context, so a report is more useful for debugging
than console output alone and can be shared as a CI artifact.

### Page Objects and Actions

Page objects contain mobile selectors and screen-level operations, while action
modules contain reusable workflows such as sign-in or opening a hazard report.
This separates test intent from UI implementation and makes changes to
accessibility labels or Android resource IDs localized to one place.

### Accessibility Selectors

Selectors prefer accessibility labels such as `~Hazard` and `~Location`. This
encourages testable mobile UI and is more stable and meaningful than relying on
layout coordinates. Resource IDs can be substituted when the application does
not expose suitable accessibility labels.

### Automation Scope

The examples prioritize P0 and P1 behavior: sign-in, required-field
validation, dependent hazard fields, and inspection entry. Notifications,
backend response codes, sync queues, and master-data downloads should be
validated with API or integration tests as well, because UI automation alone
cannot reliably prove backend delivery and persistence.

## Setup

Install dependencies from this folder:

```powershell
npm install
```

Start an Android emulator or connect a device, then start Appium. Configure the
application under test with environment variables:

```powershell
$env:MOBILE_APP_CONFIGURED = 'true'
$env:MOBILE_APP_PATH = 'C:\path\to\wemine.apk'
$env:ANDROID_DEVICE_NAME = 'Android Emulator'
$env:TEST_USERNAME = 'test-user'
$env:TEST_PASSWORD = 'test-password'
npm test
```

Alternatively, use `APP_PACKAGE` and `APP_ACTIVITY` instead of
`MOBILE_APP_PATH` for an already-installed application. Without
`MOBILE_APP_CONFIGURED=true`, the specs are skipped so they do not attempt to
connect to an unconfigured device.

## Test structure

- `test/pageObjects` contains accessibility and text selectors.
- `test/actions` contains reusable user workflows.
- `test/specs` maps scenarios to the manual test-case IDs.
- `test/test_data` contains environment-backed test data.

Selectors use accessibility labels such as `~Hazard` and `~Location`. If the
application uses different labels or native resource IDs, update the page
objects without changing the test scenarios.

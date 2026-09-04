# Test Automation

The Web examples under `Automation/Web` use Selenium WebDriver with Mocha. The
specs cover the highest-priority manual cases for authentication, equipment
inspection, and safety hazard reporting.

## Why These Test Tools

### Selenium WebDriver

Selenium WebDriver is used for the WeMineOffice browser flows because it drives
real browsers through the standard WebDriver protocol. This makes the tests
usable with Chrome in headless CI and with a visible browser during debugging.
It also supports the application's external Microsoft sign-in redirect better
than a unit-test-only approach.

### Mocha

Mocha is used as the test runner because the project is JavaScript-based and
the test cases are naturally organized into suites and scenarios. Its hooks
provide a simple lifecycle for creating and closing a browser for every test,
while its assertions keep failures close to the business behavior being
checked.

### Page Object Model

The page objects separate actions such as opening Equipment Inspection,
submitting a hazard report, and signing in from the test scenarios. This keeps
the scenarios readable and reduces maintenance when the UI changes.

### Centralized Locators

Locators are stored separately from page actions. WeMine uses dynamic forms and
cascading fields, so selectors are likely to change as the UI evolves. Updating
one locator file should not require rewriting the manual-test mapping.

### Screenshot Helper

The screenshot helper captures the browser state for failed or investigated
flows. This is useful for validating dynamic forms and required-field messages,
where a stack trace alone may not explain the visible UI state.

### Scope of Automation

The automated examples focus on P0 and P1 scenarios from the manual cases:
invalid sign-in, successful sign-in, inspection navigation and validation, and
hazard cascading-field and required-field behavior. API status codes,
notifications, offline synchronization, and Microsoft authentication itself
should be covered with service-level tests or dedicated test environments in a
full production test strategy.

## Run the Web cases

From `testcases/Automation/Web`:

```powershell
npm install
$env:BASE_URL = 'https://your-wemine-office-url'
$env:TEST_USERNAME = 'test-user'
$env:TEST_PASSWORD = 'test-password'
npm test
```

`BASE_URL` is required to execute browser tests. Without it, Mocha marks the
integration cases as pending so a local run does not target an undefined app.
Set `HEADLESS=false` to watch the browser. Selectors are kept in
`tests/locators` so they can be updated independently of the test scenarios.

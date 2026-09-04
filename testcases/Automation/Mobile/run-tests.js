const { spawnSync } = require('child_process');

if (process.env.MOBILE_APP_CONFIGURED !== 'true') {
  console.log('Mobile tests skipped: set MOBILE_APP_CONFIGURED=true to run against Appium.');
  process.exit(0);
}

const result = spawnSync(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['wdio', 'run', './wdio.conf.js'], {
  stdio: 'inherit'
});

process.exit(result.status === null ? 1 : result.status);

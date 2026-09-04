const required = (name, fallback = '') => process.env[name] || fallback;

module.exports = {
	baseUrl: required('BASE_URL'),
	username: required('TEST_USERNAME'),
	password: required('TEST_PASSWORD'),
	headless: process.env.HEADLESS !== 'false',
	timeout: Number(process.env.TEST_TIMEOUT || 10000)
};

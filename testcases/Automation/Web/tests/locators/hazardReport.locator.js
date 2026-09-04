module.exports = {
	menu: "//*[normalize-space()='Hazard']",
	newReport: "//*[contains(normalize-space(), 'Report New Hazard') or @aria-label='New Hazard' or normalize-space()='+']",
	location: "select[name='location'], [name='location']",
	sublocation: "select[name='sublocation'], [name='sublocation']",
	area: "select[name='area'], [name='area']",
	description: "textarea[name='areaDescription'], [name='areaDescription']",
	evidence: "input[type='file'][name='evidence'], input[type='file']",
	pic: "select[name='pic'], [name='pic']",
	submit: "button[type='submit'], button//*[normalize-space()='Submit']/..",
	validation: "[role='alert'], .error, .invalid-feedback, [aria-invalid='true']"
};

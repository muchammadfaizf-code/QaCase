module.exports = {
	menu: "//*[normalize-space()='Equipment Inspection']",
	newSubmission: "//*[contains(normalize-space(), 'New Submission') or normalize-space()='+' or @aria-label='New Submission']",
	formCode: "select[name='formCode'], [name='formCode'], input[placeholder*='Form Code']",
	dynamicFields: "[data-testid='dynamic-field'], form input:not([name='formCode']), form select, form textarea, form [role='radio'], form input[type='file']",
	submit: "button[type='submit'], button//*[normalize-space()='Submit']/..",
	validation: "[role='alert'], .error, .invalid-feedback, [aria-invalid='true']"
};

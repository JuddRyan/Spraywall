const saveRoute = (inputState) => {
	const circlesStringify = JSON.stringify(inputState);
	console.log(circlesStringify.toString('base64'));
	// using window.btoa instead of only btoa to prevent deprecated error from apearing
	// this error is only for nodejs and as such can currently be ignored
	const b64String = window.btoa(circlesStringify);
	navigator.clipboard.writeText(b64String);
};

export default saveRoute;

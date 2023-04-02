const loadRoute = (input, setState) => {
	const decodedString = window.atob(input);

	const jsonLoad = JSON.parse(decodedString);
	setState(jsonLoad);
};

export default loadRoute;

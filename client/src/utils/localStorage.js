export const loadToken = () => {
	try {
		// const tokenString = localStorage.getItem('token');
		const tokenString = localStorage.getItem('token');
		return JSON.parse(tokenString);
	} catch (error) {
		return null;
	}
};

export const saveToken = (token) => {
	try {
		const tokenString = JSON.stringify(token);
		localStorage.setItem('token', tokenString);
	} catch (error) {
		console.log(error);
	}
};

export const deleteToken = () => {
	try {
		localStorage.setItem('token', null);
	} catch (error) {
		console.log(error);
	}
};

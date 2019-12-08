import * as actionTypes from './types';

export const setUser = user => {
	return {
		type: actionTypes.SET_USER,
		payload: {
			currentUser: user,
		},
	};
};

export const setTheme = theme => {
	return {
		type: actionTypes.SET_THEME,
		payload: {
			theme,
		},
	};
};

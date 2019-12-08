import { combineReducers } from 'redux';
import * as actionTypes from '../actions/types';
import { light } from '../theme/theme';

const initUserState = {
	currentUser: null,
	isLoading: true,
};

const user_reducer = (state = initUserState, action) => {
	switch (action.type) {
		case actionTypes.SET_USER:
			return {
				currentUser: action.payload.currentUser,
				isLoading: false,
			};

		default:
			return state;
	}
};

const initThemeState = {
	theme: light,
};

const theme_reducer = (state = initThemeState, action) => {
	switch (action.type) {
		case actionTypes.SET_THEME:
			return {
				theme: action.payload.theme,
			};

		default:
			return state;
	}
};

const rootReducer = combineReducers({ user: user_reducer, theme: theme_reducer });

export default rootReducer;

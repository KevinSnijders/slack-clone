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
		case actionTypes.CLEAR_USER:
			return {
				...state,
				isLoading: false,
			};
		default:
			return state;
	}
};

const initChannelState = {
	currentChannel: null,
	isPrivateChannel: false,
};

const channel_reducer = (state = initChannelState, action) => {
	switch (action.type) {
		case actionTypes.SET_CURRENT_CHANNEL:
			return {
				...state,
				currentChannel: action.payload.currentChannel,
			};
		case actionTypes.SET_PRIVATE_CHANNEL:
			return {
				...state,
				isPrivateChannel: action.payload.isPrivateChannel,
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
				...state,
				theme: action.payload.theme,
			};

		default:
			return state;
	}
};

const rootReducer = combineReducers({
	user: user_reducer,
	channel: channel_reducer,
	theme: theme_reducer,
});

export default rootReducer;

import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index.js';
import { loadToken } from './localStorage';

const savedToken = loadToken();

const initialState = {
	auth: {
		token: savedToken,
		loading: false,
		error: null,
	},
};

const middleware = [thunk];

const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

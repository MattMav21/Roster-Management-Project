import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";

import memberReducer from "./member";
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';

const rootReducer = combineReducers({
    // user: userReducer,
    member: memberReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
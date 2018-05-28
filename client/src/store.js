import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import allReducers from './reducers/index';

const logger = createLogger();
const store = createStore(allReducers, applyMiddleware(promise(), thunk, logger));

export default store;

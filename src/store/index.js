import {createStore, applyMiddleWare} from '../../redux-handwriting';
// import {createStore, applyMiddleware} from 'redux';
import countReducer from './countReducer';
// import logger from 'redux-logger';
import {logger, logger2} from '../../redux-handwriting/my-redux-logger'


const store = createStore(countReducer, applyMiddleWare(logger, logger2));

export default store;
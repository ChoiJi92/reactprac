import {createStore, combineReducers, applyMiddleware, compose } from "redux"
import score from "./modules/score"
import thunk from 'redux-thunk'

const middlewares = [thunk];
const rootReducer = combineReducers({score});
const enhancer = applyMiddleware(...middlewares)
const store = createStore(rootReducer, enhancer)

export default store
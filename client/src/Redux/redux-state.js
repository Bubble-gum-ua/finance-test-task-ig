import {tickersReducer} from "./TikersReducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";


let reducers = combineReducers( {
    tickers: tickersReducer
})

const store = createStore(reducers,applyMiddleware(thunk));
window.store = store;
export default store;
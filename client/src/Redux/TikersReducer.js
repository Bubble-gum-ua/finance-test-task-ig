import React from "react";

const ADD_TICKER = 'ADD_TICKER';
const DELETE_TICKER = 'DELETE_TICKER';

let initialState = {
    tickers: [
        {
            change: '0',
            change_percent: '0',
            dividend: '0',
            exchange: '0',
            last_trade_time: '0',
            price: '0',
            ticker: '0',
            yield: '0'
        }
    ],
}


export const tickersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TICKER : {
            return {
                ...state,
                tickers: [action.body, ...state.tickers]
            }
        }
        default:
            return state
    }
}

const addTicker = (name) => ({type: ADD_TICKER, name})

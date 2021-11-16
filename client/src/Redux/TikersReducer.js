import React from "react";
import {io} from "socket.io-client";

const ADD_TICKER = 'ADD_TICKER';
const REFRESH_DATA = 'REFRESH_DATA'
const SET_ERROR = 'SET_ERROR';

let initialState = {
    tickers: [],
}

export const tickersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TICKER : {
            return {
                ...state,
                tickers: [action.card, ...state.tickers]
            }
        }
        case REFRESH_DATA : {
            const currenTicker = state.tickers.findIndex(el => el.id === action.card.id)
            state.tickers[currenTicker] = action.card
            return {
                ...state,
                tickers: [...state.tickers]
            }
        }
        default:
            return state
    }
}
export const addTicker = (card) => ({type: ADD_TICKER, card})
export const refreshTicker = (card) => ({type: REFRESH_DATA, card})
export const setError = (error) => ({type: SET_ERROR, error})
export const subscribeToTicker = (name, action) => {
    return (dispatch, getState) => {
        if (action === 'ADD_TICKER') {
            const socket = io('ws://localhost:4000')
            socket.emit('start');
            socket.on('ticker', (response) => {
                const res = Array.isArray(response) ? response : [response];
                for (let i = 0; i < res.length; i++) {
                    if (name === res[i].ticker) {
                        let arrF = getState().tickers.tickers.filter(obj => {
                            return obj.ticker === name
                        })

                        if (arrF[0] !== undefined && arrF[0].ticker === name) {
                            dispatch(refreshTicker(res[i]))
                        } else {
                            dispatch(addTicker(res[i]))
                        }
                    }
                }
            })
        }
    }
}

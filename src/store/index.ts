/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-shadow */
import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';

enum ActionType {
  SET_EXCHANGE = 'SET_EXCHANGE',
}

const InitialState = {
  exchange: {},
};

export const setExchange = createAction<Exchange>(ActionType.SET_EXCHANGE);

const reducer = createReducer(InitialState, (builder) => {
  builder.addCase(setExchange, (state, action:any) => {
    // eslint-disable-next-line no-param-reassign
    state.exchange = action.payload;
  });
});

export const store = configureStore({
  reducer,
});

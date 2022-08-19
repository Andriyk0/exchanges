import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';

const InitialState = {
  exchange: {},
};

export const setExchange = createAction<Exchange>('SET_EXCHANGE');

const reducer = createReducer(InitialState, (builder) => {
  builder.addCase(setExchange, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.exchange = action.payload;
  });
});

export const store = configureStore({
  reducer,
});

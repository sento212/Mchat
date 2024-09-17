import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";

export const session = createAction("Session");

//reducer
const reducer = createReducer([], (builder) => {
  builder.addCase(session, (state, action) => {
    state.push(action.payload);
  });
});

// store
export const store = configureStore({
  reducer: {
    login: reducer,
  },
});

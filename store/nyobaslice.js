import { configureStore, createSlice } from "@reduxjs/toolkit";

// Create a slice with a name, an initial state, and reducers
export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    value: [],
  },
  reducers: {
    Sesions: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

// store
export const store = configureStore({
  reducer: {
    Session: sessionSlice.reducer,
  },
});

store.subscribe(() => {
  console.log("testing yahhhhhh : ", store.getState());
});

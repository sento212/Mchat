import { createSlice } from "@reduxjs/toolkit";

// Create a slice with a name, an initial state, and reducers
const sessionSlice = createSlice({
  name: "Session",
  initialState: {
    value: [{ username: "", status_login: "no" }],
  },
  reducers: {
    sesions: (state, action) => {
      state.value = action.payload;
    },
    reset: (state) => {
      state.value = [{ username: "", status_login: "no" }];
    },
  },
});

export const { sesions, reset } = sessionSlice.actions;
export default sessionSlice.reducer;

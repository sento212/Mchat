import { configureStore } from "@reduxjs/toolkit";
import { sessionReducer } from "./slice/seasionslice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const sessionslice = persistReducer(persistConfig, sessionReducer);

// store
const store = configureStore({
  reducer: {
    Session: sessionslice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable values
        ignoredActions: ["persist/PERSIST"],
        ignoredPaths: ["session._persist"],
      },
    }),
});

console.log("store created : ", store.getState());

store.subscribe(() => {
  console.log("store change : ", store.getState());
});

const persistor = persistStore(store);

export { store, persistor };

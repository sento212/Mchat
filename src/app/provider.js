"use client";
// app/providers.js
import { Provider } from "react-redux";
import { store, persistor } from "../../store/seasionStore";
import { PersistGate } from "redux-persist/integration/react";

export function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

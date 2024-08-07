import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./redux/store";
import MainLayout from "./Components/layouts/mainLayout/mainLayout";
import reportWebVitals from "./reportWebVitals";

// Create the persistor
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();

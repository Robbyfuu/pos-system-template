import React from "react";
import "regenerator-runtime/runtime";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { AxiosInterceptor } from "./helpers/api_helper";
import { Provider as ProviderURQL } from "urql";
import { client } from "./helpers/Apollo";
AxiosInterceptor();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.Fragment>
    <PersistGate persistor={persistor}>
      <ProviderURQL value={client}>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </ProviderURQL>
    </PersistGate>
  </React.Fragment>
);

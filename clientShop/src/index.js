import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { persistor } from './store/store'
import { Provider } from 'react-redux';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import { PersistGate } from 'redux-persist/integration/react';
const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>

      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>

    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);


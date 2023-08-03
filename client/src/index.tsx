import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { TodoProvider } from "./store/todos";
import { Provider } from "react-redux";
import Store from "./store/Store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <TodoProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TodoProvider>
    </Provider>
  </React.StrictMode>
);
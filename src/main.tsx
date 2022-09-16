import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
//import { store } from './_store';
import App from "./App";

declare global {
  interface Window {
    _env_: any;
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <HashRouter>
    <App />
  </HashRouter>
);

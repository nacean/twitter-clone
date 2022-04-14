import React from "react";
import ReactDOM from "react-dom/client";
import App from "./component/App";
import { BrowserRouter } from "react-router-dom";

const rootNode = document.getElementById("root");

ReactDOM.createRoot(rootNode).render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

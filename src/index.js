import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

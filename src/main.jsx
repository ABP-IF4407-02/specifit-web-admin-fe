import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "../src/router/router";
import { AuthContextProvider } from "../store/auth-context";
import "./constants.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} >
        <App />
      </RouterProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

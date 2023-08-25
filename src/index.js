import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { CompaniesContextProvider } from "./context/CompanyContext";
import { ProductsContextProvider } from "./context/ProductContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthContextProvider>
    <CompaniesContextProvider>
      <ProductsContextProvider>
        <App />
      </ProductsContextProvider>
    </CompaniesContextProvider>
  </AuthContextProvider>
);

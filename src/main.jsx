// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import WInnerContextProvider from "./Contexts/Winner/WInnerContextProvider.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <WInnerContextProvider>
      <App />
    </WInnerContextProvider>
  </BrowserRouter>
);

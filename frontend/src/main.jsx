import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context/AppContext.jsx";
import { ReviewProvider } from "./context/ReviewContext.jsx";
import { HospitalInsuranceProvider } from "./context/HospitalInsuranceContext.jsx";
import SurgeryContextProvider from "./context/SurgeryContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextProvider>
      <ReviewProvider>
        <HospitalInsuranceProvider>
          <SurgeryContextProvider>
            <App />
          </SurgeryContextProvider>
        </HospitalInsuranceProvider>
      </ReviewProvider>
    </AppContextProvider>
  </BrowserRouter>
);

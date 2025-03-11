import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AdminContextProvider from "./context/AdminContext.jsx";
import DoctorContextProvider from "./context/DoctorContext.jsx";
import AppContextProvider from "./context/AppContext.jsx";
import { HospitalProvider } from "./context/HospitalContext.jsx";
import SugeriesContextProvider from "./context/SurgeriesContext.jsx";
import EmployeeContextProvider from "./context/EmployeeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminContextProvider>
      <DoctorContextProvider>
        <AppContextProvider>
          <HospitalProvider>
            <EmployeeContextProvider>
              <SugeriesContextProvider>
                <App />
              </SugeriesContextProvider>
            </EmployeeContextProvider>
          </HospitalProvider>
        </AppContextProvider>
      </DoctorContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
);

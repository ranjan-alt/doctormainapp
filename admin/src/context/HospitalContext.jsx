// HospitalContext.js
import React, { createContext, useState, useContext } from "react";

const HospitalContext = createContext();

export const useHospitalContext = () => useContext(HospitalContext);

export const HospitalProvider = ({ children }) => {
  const [hospitals, setHospitals] = useState([]);
  const [insuranceTypes, setInsuranceTypes] = useState([]);

  // Function to save hospitals to DB (via API call)
  const saveHospitalToDB = async (newHospital) => {
    try {
      const response = await fetch("/api/hospitals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHospital),
      });
      if (!response.ok) {
        throw new Error("Failed to save hospital");
      }
      const savedHospital = await response.json();
      setHospitals((prevHospitals) => [...prevHospitals, savedHospital]);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to save insurance types to DB (via API call)
  const saveInsuranceToDB = async (newInsurance) => {
    try {
      const response = await fetch("/api/insurances", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInsurance),
      });
      if (!response.ok) {
        throw new Error("Failed to save insurance");
      }
      const savedInsurance = await response.json();
      setInsuranceTypes((prevInsuranceTypes) => [
        ...prevInsuranceTypes,
        savedInsurance,
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <HospitalContext.Provider
      value={{ hospitals, insuranceTypes, saveHospitalToDB, saveInsuranceToDB }}
    >
      {children}
    </HospitalContext.Provider>
  );
};

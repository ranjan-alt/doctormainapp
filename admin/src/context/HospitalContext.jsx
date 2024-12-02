import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios"; // Import axios for API calls
import { toast } from "react-toastify"; // Optionally use toast for notifications

const HospitalContext = createContext();

export const useHospitalContext = () => useContext(HospitalContext);

export const HospitalProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Your backend URL

  const [hospitals, setHospitals] = useState([]);
  const [insuranceTypes, setInsuranceTypes] = useState([]);

  // Fetch insurance types from DB
  const fetchInsuranceTypes = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/insurances`);
      console.log(data, "ddtaaa");
      if (data.success) {
        setInsuranceTypes(data.insurances); // Set fetched insurance types to state
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch insurance types");
    }
  };
  const fetchHospitalTypes = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/hospitals`);
      if (data.success) {
        setHospitals(data.hospitals);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch hospital types");
    }
  };

  // Fetch the insurance types when the component mounts
  useEffect(() => {
    fetchInsuranceTypes();
    fetchHospitalTypes();
  }, [hospitals]);

  // Function to save hospitals to DB (via API call)
  const saveHospitalToDB = async (newHospital) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/hospitals`,
        newHospital,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        setHospitals((prevHospitals) => [...prevHospitals, data.savedHospital]);
        toast.success("Hospital saved successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save hospital");
    }
  };

  // Function to save insurance types to DB (via API call)
  const saveInsuranceToDB = async (newInsurance) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/insurances`,
        newInsurance,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        setInsuranceTypes((prevInsuranceTypes) => [
          ...prevInsuranceTypes,
          data.savedInsurance,
        ]);
        toast.success("Insurance type saved successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save insurance");
    }
  };

  return (
    <HospitalContext.Provider
      value={{
        hospitals,
        insuranceTypes,
        saveHospitalToDB,
        saveInsuranceToDB,
        fetchInsuranceTypes, // Provide the fetch function in context if needed elsewhere
        fetchHospitalTypes,
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};

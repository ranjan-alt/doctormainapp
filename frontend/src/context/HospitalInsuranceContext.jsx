import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";

const HospitalInsuranceContext = createContext();

// Backend URL (replace with your actual URL)
const backendUrl = import.meta.env.VITE_BACKEND_URL; // or your deployed backend URL

export const HospitalInsuranceProvider = ({ children }) => {
  const [hospitals, setHospitals] = useState([]);
  const [insurances, setInsurances] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch hospital data from the backend
  const fetchHospitals = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/hospitals`);
      console.log(response, "hospitaldata");
      setHospitals(response.data.hospitals);
      setInsurances(response.data.hospitals.insurances);
    } catch (error) {
      console.error("Error fetching hospitals", error);
    }
  };

  // Fetch insurance data from the backend
  const fetchInsurances = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/insurances`);
      console.log(response, "insurancedata");
      //   setInsurances(response.data.insurances);
    } catch (error) {
      console.error("Error fetching insurances", error);
    }
  };

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    const loadData = async () => {
      await fetchHospitals();
      await fetchInsurances();
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <HospitalInsuranceContext.Provider
      value={{ hospitals, insurances, loading }}
    >
      {children}
    </HospitalInsuranceContext.Provider>
  );
};

// Custom hook to use the context
export const useHospitalInsurance = () => useContext(HospitalInsuranceContext);

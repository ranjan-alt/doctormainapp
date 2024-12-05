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

  // Fetch hospital types from DB
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

  // Fetch insurance types and hospitals on mount
  useEffect(() => {
    fetchInsuranceTypes();
    fetchHospitalTypes();
  }, []); // Empty dependency array to fetch data only once

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
        // Directly update the hospitals state without refetching
        setHospitals((prevHospitals) => [...prevHospitals, data.savedHospital]);
        toast.success("Hospital saved successfully");
        fetchHospitalTypes();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save hospital");
    }
  };

  const editHospitalInDB = async (hospitalId, updatedHospitalData) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/hospitals/edit/${hospitalId}`,
        updatedHospitalData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        setHospitals((prevHospitals) => {
          prevHospitals.map((hospital) => {
            hospital._id === hospitalId
              ? { ...hospital, ...updatedHospitalData }
              : hospital;
          });
        });
        toast.success("Hospital updated successfully");
      }
    } catch (error) {
      toast.error(data.message);
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
        fetchInsuranceTypes();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save insurance");
    }
  };

  const editInsuranceInDB = async (insuranceId, updatedName) => {
    // TO DO: implement edit functionality
    const { data } = await axios.put(
      `${backendUrl}/api/insurances/edit/${insuranceId}`,
      { name: updatedName },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (data.success) {
      setInsuranceTypes((prevInsuranceTypes) => {
        prevInsuranceTypes.map((insurance) => {
          insurance._id === insuranceId
            ? { ...insurance, name: updatedName }
            : insurance;
        });
      });
      toast.success("Insurance updated successfully");
    } else {
      toast.error(data.message);
    }
    try {
    } catch (error) {
      console.error(error);
      toast.error("Failed to update insurance");
    }
  };

  // Function to delete all hospitals
  const handleDeleteAll = async () => {
    try {
      const response = await axios.delete(`${backendUrl}/api/hospitals`);
      toast.success(response.data.message); // Use toast for success
      setHospitals([]); // Clear the hospitals state
    } catch (error) {
      toast.error("Error deleting hospitals");
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
        handleDeleteAll,
        editInsuranceInDB,
        editHospitalInDB,
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};

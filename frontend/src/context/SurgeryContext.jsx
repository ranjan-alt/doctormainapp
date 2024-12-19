import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

import { createContext } from "react";

export const SurgeryContext = createContext();

const SurgeryContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [surgeries, setSurgeries] = useState([]);
  const [formData, setFormData] = useState({
    city: "",
    surgery: "",
    name: "",
    phone: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const getSurgeries = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/surgeries`);
      setSurgeries(response.data.getSurgeries);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSubmitSurgeryQueries = async (e) => {
    e.preventDefault();
    toast.info("Submitting your query...");
    try {
      const surgeryQueries = await axios.post(
        `${backendUrl}/api/surgeries/surgeryqueries`,
        formData
      );
      if (surgeryQueries.data.success) {
        toast.success("Appointment booked successfully!");
      } else {
        toast.error("There was an issue booking your appointment.");
      }
    } catch (err) {
      console.error("err");
    }
  };

  useEffect(() => {
    getSurgeries();
  }, []);

  const value = {
    getSurgeries,
    surgeries,
    handleSubmitSurgeryQueries,
    handleChange,
    formData,
    setFormData,
  };

  return (
    <SurgeryContext.Provider value={value}>
      {props.children}
    </SurgeryContext.Provider>
  );
};

export default SurgeryContextProvider;

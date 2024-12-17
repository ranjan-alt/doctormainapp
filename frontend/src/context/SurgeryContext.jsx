import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

import { createContext } from "react";

export const SurgeryContext = createContext();

const SurgeryContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [surgeries, setSurgeries] = useState([]);

  const getSurgeries = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/surgeries`);
      setSurgeries(response.data.getSurgeries);
    } catch (err) {
      console.error("Error fetching surgeries:", err.message);
    }
  };

  useEffect(() => {
    getSurgeries();
  }, []);

  const value = {
    getSurgeries,
    surgeries,
  };

  return (
    <SurgeryContext.Provider value={value}>
      {props.children}
    </SurgeryContext.Provider>
  );
};

export default SurgeryContextProvider;

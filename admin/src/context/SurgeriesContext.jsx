import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";

export const SurgeriesContext = createContext();

const SugeriesContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [specialties, setSpecialties] = useState([
    { name: "", procedures: [""] },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = specialties.map((specialty) => ({
        name: specialty.name,
        procedures: specialty.procedures.map((procedure) => ({
          name: procedure,
        })),
      }));

      const data = await axios.post(`${backendUrl}/api/surgeries`, payload);
      if (data.success) {
        setSpecialties([{ name: "", procedures: [""] }]);
        console.log("Response:", response.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSpecialtyChange = (index, value) => {
    console.log(index, "index");
    const updatedSpecialties = [...specialties];
    console.log(updatedSpecialties, "updated");
    updatedSpecialties[index].name = value;
    setSpecialties(updatedSpecialties);
  };

  const handleProcedureChange = (specIndex, procIndex, value) => {
    const updatedSpecialties = [...specialties];
    updatedSpecialties[specIndex].procedures[procIndex] = value;
    setSpecialties(updatedSpecialties);
  };

  const addSpecialty = () => {
    setSpecialties([...specialties, { name: "", procedures: [""] }]);
  };
  const addProcedure = (specIndex) => {
    const updatedSpecialties = [...specialties];
    updatedSpecialties[specIndex].procedures.push("");
    setSpecialties(updatedSpecialties);
  };

  const value = {
    handleSubmit,
    specialties,
    setSpecialties,
    handleSpecialtyChange,
    handleProcedureChange,
    addSpecialty,
    addProcedure,
  };

  return (
    <SurgeriesContext.Provider value={value}>
      {props.children}
    </SurgeriesContext.Provider>
  );
};

export default SugeriesContextProvider;

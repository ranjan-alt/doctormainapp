import { createContext } from "react";

export const EmployeeContext = createContext();
console.log(EmployeeContext, "contetxlog");

const EmployeeContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/employees", employee);
      onEmployeeAdded(); // Refresh employee list
      setEmployee({ name: "", email: "", role: "", permissions: [] }); // Reset form
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <EmployeeContext.Provider value={handleSubmit}>
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeContextProvider;

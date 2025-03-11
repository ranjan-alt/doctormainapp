import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { EmployeeContext } from "../../context/EmployeeContext";

const AddEmployee = ({ onEmployeeAdded }) => {
  const { handleSubmit } = useContext(EmployeeContext);
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    role: "",
    permissions: [],
  });

  const screens = [
    "Dashboard",
    "Appointments",
    "Doctors",
    "Hospitals",
    "Surgeries",
    "Employees",
  ];

  const handleCheckboxChange = (screen) => {
    console.log(screen, "screen");
    setEmployee((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(screen)
        ? prev.permissions.filter((p) => p !== screen)
        : [...prev.permissions, screen],
    }));
  };

  return (
    <div className="p-5 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Add Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            className="border p-2 w-full rounded-md"
            value={employee.name}
            onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="border p-2 w-full rounded-md"
            value={employee.email}
            onChange={(e) =>
              setEmployee({ ...employee, email: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Role</label>
          <input
            type="text"
            className="border p-2 w-full rounded-md"
            value={employee.role}
            onChange={(e) => setEmployee({ ...employee, role: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Screen Access</label>
          <div className="grid grid-cols-2 gap-2">
            {screens.map((screen) => (
              <label key={screen} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={employee.permissions.includes(screen)}
                  onChange={() => handleCheckboxChange(screen)}
                />
                <span>{screen}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;

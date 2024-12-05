import React, { useState } from "react";
import { useHospitalContext } from "../../context/HospitalContext";

const HospitalList = () => {
  // Use context for hospitals and insurance list
  const {
    hospitals,
    insuranceTypes,
    saveHospitalToDB,
    saveInsuranceToDB,
    fetchHospitalTypes,
    // handleDeleteAll,
    fetchInsuranceTypes,
    editInsuranceInDB,
  } = useHospitalContext();
  console.log(insuranceTypes, "insuarnce");

  const [selectedInsurances, setSelectedInsurances] = useState([]);
  const [newHospitalName, setNewHospitalName] = useState("");
  const [newInsuranceName, setNewInsuranceName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editInsuranceId, setEditInsuranceId] = useState(null);
  const [editInsuranceName, setEditInsuranceName] = useState("");

  // Handle adding a new hospital
  const handleAddHospital = async (e) => {
    e.preventDefault();

    if (!newHospitalName || selectedInsurances.length === 0) {
      setError(
        "Please enter a hospital name and select at least one insurance."
      );
      return;
    }

    const newHospital = {
      name: newHospitalName,
      insurances: selectedInsurances,
    };
    try {
      setIsLoading(true); // Set loading to true when API call starts
      await saveHospitalToDB(newHospital); // Save to DB
      setNewHospitalName("");
      setSelectedInsurances([]);
      setError("");
    } catch (err) {
      setError("Error saving hospital. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Handle adding a new insurance type
  const handleAddInsurance = async (e) => {
    e.preventDefault();

    if (!newInsuranceName) {
      setError("Please enter an insurance name.");
      return;
    }

    const newInsurance = {
      name: newInsuranceName,
    };
    try {
      setIsLoading(true); // Set loading to true when API call starts
      await saveInsuranceToDB(newInsurance); // Save to DB
      setNewInsuranceName("");
      setError("");
    } catch (err) {
      setError("Error saving insurance. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Handle insurance selection for the hospital
  const handleInsuranceChange = (e) => {
    const { value, checked } = e.target;
    setSelectedInsurances((prevState) => {
      if (checked) {
        // Add the insurance to the selected list if it's checked
        return [...prevState, value];
      } else {
        // Remove the insurance from the selected list if it's unchecked
        return prevState.filter((insurance) => insurance !== value);
      }
    });
  };

  const handleEditInsurance = (insuranceId, updatedName) => {
    editInsuranceInDB(insuranceId, updatedName)
      .then(() => {
        fetchInsuranceTypes(); // Fetch the updated insurance types from the server
        setEditInsuranceId(null); // Reset edit mode
      })
      .catch((err) => {
        console.error("Error updating insurance:", err);
      });
  };

  const handleDeleteInsurance = (id) => {
    // Handle deletion logic here
    console.log("Delete insurance with ID:", id);
  };
  return (
    <div className="p-6 bg-gray-50 w-full">
      <h1 className="text-3xl font-semibold mb-6">Hospital List</h1>

      {/* Form to add a new hospital */}
      <form
        onSubmit={handleAddHospital}
        className="mb-6 bg-white p-6 border border-gray-200 rounded-lg shadow-sm w-full"
      >
        <h2 className="text-2xl font-medium mb-4">Add New Hospital</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Hospital name input */}
        <div className="mb-4">
          <label
            htmlFor="hospitalName"
            className="block text-sm font-medium text-gray-700"
          >
            Hospital Name
          </label>
          <input
            type="text"
            id="hospitalName"
            value={newHospitalName}
            onChange={(e) => setNewHospitalName(e.target.value)}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter hospital name"
          />
        </div>

        {/* Insurance selection (multi-select) */}
        <div className="mb-4">
          <label
            htmlFor="insurance"
            className="block text-sm font-medium text-gray-700"
          >
            Insurance Accepted
          </label>
          <div className="mt-2">
            {insuranceTypes?.map((insurance) => (
              <div key={insurance.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`insurance-${insurance.id}`}
                  value={insurance.name}
                  checked={selectedInsurances.includes(insurance.name)}
                  onChange={handleInsuranceChange}
                  className="mr-2"
                />
                <label
                  htmlFor={`insurance-${insurance.id}`}
                  className="text-sm text-gray-700"
                >
                  {editInsuranceId === insurance._id ? (
                    <input
                      type="text"
                      value={editInsuranceName}
                      onChange={(e) => setEditInsuranceName(e.target.value)}
                      className="border rounded p-2"
                    />
                  ) : (
                    insurance.name
                  )}
                </label>
                {/* Edit Button */}
                {editInsuranceId === insurance._id ? (
                  <button
                    onClick={() => {
                      handleEditInsurance(insurance._id, editInsuranceName); // Send the updated insurance name to the server
                      setEditInsuranceId(null); // Reset editing state
                    }}
                    className="ml-2 text-blue-500 hover:text-blue-700 text-xs"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditInsuranceId(insurance._id); // Set the insurance to be edited
                      setEditInsuranceName(insurance.name); // Set the name in the input field
                    }}
                    className="ml-2 text-blue-500 hover:text-blue-700 text-xs"
                  >
                    Edit
                  </button>
                )}

                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteInsurance(insurance._id)}
                  className="ml-2 text-red-500 hover:text-red-700 text-xs"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        >
          {isLoading ? "Saving..." : "Add Hospital"}
        </button>
      </form>
      {/* <button
        onClick={handleDeleteAll}
        className="px-6 py-3 bg-red-500 text-white rounded-md"
      >
        DLETE ALL
      </button> */}

      {/* Form to add a new insurance type */}
      <form
        onSubmit={handleAddInsurance}
        className="mb-6 bg-white p-6 border border-gray-200 rounded-lg shadow-sm w-full"
      >
        <h2 className="text-2xl font-medium mb-4">Add New Insurance</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Insurance name input */}
        <div className="mb-4">
          <label
            htmlFor="insuranceName"
            className="block text-sm font-medium text-gray-700"
          >
            Insurance Name
          </label>
          <input
            type="text"
            id="insuranceName"
            value={newInsuranceName}
            onChange={(e) => setNewInsuranceName(e.target.value)}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter insurance name"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500"
        >
          {isLoading ? "Saving..." : "Add Insurance"}
        </button>
      </form>

      {/* Hospital list table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse border border-gray-200 shadow-lg rounded-lg w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-700">
                Hospital Name
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">
                Insurance Accepted
              </th>
            </tr>
          </thead>
          <tbody>
            {hospitals.map((hospital) => (
              <tr key={hospital.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 text-gray-600">{hospital.name}</td>
                <td className="px-4 py-2">
                  <ul>
                    {hospital.insurances.map((insurance, index) => (
                      <li key={index} className="text-gray-500">
                        {insurance}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HospitalList;

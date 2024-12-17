import React, { useState } from "react";
import { useContext } from "react";
import { SurgeriesContext } from "../../context/SurgeriesContext";

const SurgeryList = () => {
  // const [specialties, setSpecialties] = useState([
  //   { name: "", procedures: [""] },
  // ]);

  const {
    specialties,
    setSpecialties,
    handleSubmit,
    handleSpecialtyChange,
    handleProcedureChange,
    addSpecialty,
    addProcedure,
  } = useContext(SurgeriesContext);

  console.log(specialties, "specilaities");

  return (
    <>
      <div className="flex flex-col w-full md:flex-row gap-6 p-6 bg-gray-100 min-h-screen">
        {/* Form Section */}
        <div className="w-full md:w-full p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-indigo-700 mb-4 text-center">
            Add Specialties & Procedures
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {specialties.map((specialty, specIndex) => (
              <div
                key={specIndex}
                className="p-4 border rounded-lg bg-gray-50 shadow-md space-y-4"
              >
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Specialty Name
                  </label>
                  <input
                    type="text"
                    value={specialty.name}
                    onChange={(e) =>
                      handleSpecialtyChange(specIndex, e.target.value)
                    }
                    placeholder="Enter specialty name"
                    className="mt-1 p-2 block w-full border rounded-md text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Procedures
                  </label>
                  {specialty.procedures.map((procedure, procIndex) => (
                    <div
                      key={procIndex}
                      className="flex items-center gap-4 mt-2"
                    >
                      <input
                        type="text"
                        value={procedure}
                        onChange={(e) =>
                          handleProcedureChange(
                            specIndex,
                            procIndex,
                            e.target.value
                          )
                        }
                        placeholder="Enter procedure name"
                        className="flex-1 p-2 border rounded-md text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      {specialty.procedures.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updatedSpecialties = [...specialties];
                            updatedSpecialties[specIndex].procedures.splice(
                              procIndex,
                              1
                            );
                            setSpecialties(updatedSpecialties);
                          }}
                          className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => addProcedure(specIndex)}
                  className="mt-3 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Add Procedure
                </button>
              </div>
            ))}
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={addSpecialty}
                className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full sm:w-auto"
              >
                Add Specialty
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 w-full sm:w-auto"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Data Display Section */}
        <div className="w-full md:w-full p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-indigo-700 mb-4 text-center">
            Submitted Specialties & Procedures
          </h1>
          {specialties.map((specialty, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg bg-gray-50 shadow-md mb-4"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {specialty.name || "Unnamed Specialty"}
              </h2>
              <ul className="list-disc list-inside mt-2 text-gray-700">
                {specialty.procedures.map((procedure, idx) => (
                  <li key={idx}>{procedure || "Unnamed Procedure"}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SurgeryList;

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

const Doctors = () => {
  const { speciality } = useParams();

  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [locationQuery, setLocationQuery] = useState("");
  console.log(locationQuery, "12");
  const [locations, setLocations] = useState([]);

  const navigate = useNavigate();

  const { doctors } = useContext(AppContext);
  console.log(doctors, "doctorslist");
  // Extract unique locations from the doctors list
  useEffect(() => {
    if (doctors.length > 0) {
      const uniqueLocations = [
        ...new Set(
          doctors.map((doc) =>
            `${doc.address?.line1 || ""}, ${doc.address?.line2 || ""}`
              .replace(/,\s*$/, "") // Remove trailing commas
              .trim()
          )
        ),
      ];
      console.log("Unique Locations:", locations);
      setLocations(uniqueLocations);
    }
  }, [doctors]);
  const applyFilter = () => {
    let filteredDoctors = doctors;
    if (speciality) {
      filteredDoctors = filteredDoctors.filter(
        (doc) => doc.speciality === speciality
      );
    }
    // If there's a search query, filter based on it
    if (searchQuery) {
      filteredDoctors = filteredDoctors.filter(
        (doc) =>
          doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.speciality.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (locationQuery) {
      const normalizedQuery = locationQuery.trim().toLowerCase();
      filteredDoctors = filteredDoctors.filter((doc) => {
        const fullAddress = `${doc.address?.line1 || ""}, ${
          doc.address?.line2 || ""
        }`
          .replace(/\s+/g, " ") // Normalize spaces
          .replace(/,\s*$/, "") // Remove trailing commas
          .trim()
          .toLowerCase();
        console.log("Filtering Address:", { fullAddress, normalizedQuery });
        return fullAddress.includes(normalizedQuery);
      });
    }
    setFilterDoc(filteredDoctors);
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality, searchQuery, locationQuery]);
  console.log("Filter Applied with:", {
    speciality,
    searchQuery,
    locationQuery,
  });

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      {/* Search bar */}
      <div className="w-full max-w-lg min-w-full">
        <div className="relative flex items-center border border-slate-200 rounded-md shadow-sm">
          {/* Doctor Search Section */}
          <div className="flex items-center w-full border-r border-slate-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 ml-3 text-slate-600"
            >
              <path d="M12 2a6 6 0 0 1 6 6 6 6 0 0 1-12 0 6 6 0 0 1 6-6Zm0 1.5A4.5 4.5 0 1 0 12 12a4.5 4.5 0 0 0 0-9Z" />
            </svg>
            <input
              // value={searchQuery} // Bind to searchQuery state
              onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm px-3 py-2 focus:outline-none"
              placeholder="Search for doctors..."
            />
          </div>

          {/* Location Search Section */}
          <div className="flex items-center w-full">
            <select
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)} // Update locationQuery state
              className="w-full bg-transparent text-slate-700 text-sm px-3 py-2 focus:outline-none"
            >
              <option value="">Select Location</option>
              {locations.map((loc, index) => (
                <option key={index} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center w-full">
            <select
              className="w-full bg-transparent text-slate-700 text-sm px-3 py-2 focus:outline-none"
              onChange={(e) => setSearchQuery(e.target.value)} // Use searchQuery for filtering
              value={searchQuery}
            >
              <option value="">Select Specialisation</option>

              {[...new Set(doctors.map((doc) => doc.speciality))].map(
                (speciality, index) => (
                  <option key={index} value={speciality}>
                    {speciality}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`py-1 px-3 border rounded text-sm  transition-all sm:hidden ${
            showFilter ? "bg-[#2563eb] text-white" : ""
          }`}
        >
          Filters
        </button>
        <div
          className={`flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          <p
            onClick={() =>
              speciality === "General physician"
                ? navigate("/doctors")
                : navigate("/doctors/General physician")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "General physician"
                ? "bg-[#E2E5FF] text-black "
                : ""
            }`}
          >
            General physician
          </p>
          <p
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Gynecologist" ? "bg-[#E2E5FF] text-black " : ""
            }`}
          >
            Gynecologist
          </p>
          <p
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Dermatologist" ? "bg-[#E2E5FF] text-black " : ""
            }`}
          >
            Dermatologist
          </p>
          <p
            onClick={() =>
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Pediatricians" ? "bg-[#E2E5FF] text-black " : ""
            }`}
          >
            Pediatricians
          </p>
          <p
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Neurologist" ? "bg-[#E2E5FF] text-black " : ""
            }`}
          >
            Neurologist
          </p>
          <p
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Gastroenterologist"
                ? "bg-[#E2E5FF] text-black "
                : ""
            }`}
          >
            Gastroenterologist
          </p>
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterDoc.map((item, index) => (
            <div
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                scrollTo(0, 0);
              }}
              className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              key={index}
            >
              <img className="bg-[#EAEFFF]" src={item.image} alt="" />
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm text-center ${
                    item.available ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  <p
                    className={`w-2 h-2 rounded-full ${
                      item.available ? "bg-green-500" : "bg-gray-500"
                    }`}
                  ></p>
                  <p>{item.available ? "Available" : "Not Available"}</p>
                </div>
                <p className="text-[#262626] text-lg font-medium">
                  {item.name}
                </p>
                <p className="text-[#5C5C5C] text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;

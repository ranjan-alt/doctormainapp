import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const Doctors = () => {
  const { speciality } = useParams();

  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);

  const navigate = useNavigate();

  const { doctors } = useContext(AppContext);
  console.log(doctors, "doctorslist");

  ///filters section
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

    if (country) {
      filteredDoctors = filteredDoctors.filter(
        (doc) => doc.country?.toLowerCase() === country.name.toLowerCase()
      );
    }

    if (state) {
      filteredDoctors = filteredDoctors.filter(
        (doc) => doc.state?.toLowerCase() === state.name.toLowerCase()
      );
    }

    if (city) {
      filteredDoctors = filteredDoctors.filter(
        (doc) => doc.city?.toLowerCase() === city.name.toLowerCase()
      );
    }
    setFilterDoc(filteredDoctors);
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality, searchQuery, country, state, city]);

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      {/* Search bar */}
      <div className="w-full max-w-lg min-w-full">
        <div className="relative flex flex-col sm:flex-row items-center border border-slate-200 rounded-md shadow-sm p-2 gap-2">
          {/* Doctor Search Section */}
          <div className="flex items-center w-full sm:w-auto border-r sm:border-r border-slate-200 px-2">
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

          {/* search by country state and city */}
          <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto gap-2">
            <CountrySelect
              containerClassName="w-full sm:w-auto"
              inputClassName=""
              onChange={(_country) => setCountry(_country)}
              onTextChange={(_txt) => console.log(_txt)}
              placeHolder="Select Country"
            />
            <StateSelect
              countryid={country?.id}
              containerClassName="w-full sm:w-auto"
              inputClassName=""
              onChange={(_state) => setState(_state)}
              onTextChange={(_txt) => console.log(_txt)}
              defaultValue={state}
              placeHolder="Select State"
            />
            <CitySelect
              countryid={country?.id}
              stateid={state?.id}
              containerClassName="w-full sm:w-auto"
              inputClassName=""
              onChange={(_city) => setCity(_city)}
              onTextChange={(_txt) => console.log(_txt)}
              defaultValue={city}
              placeHolder="Select City"
            />
          </div>
          {/* search by specialisation */}
          <div className="w-full sm:w-auto">
            <select
              className="w-full bg-transparent text-slate-700 text-sm px-3 py-2 focus:outline-none border border-gray-300 rounded"
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
                <div className="flex gap-x-4">
                  <div className="flex flex-col">
                    <p className="text-[#262626] text-lg font-medium">
                      {item.name}
                    </p>
                    <p className="text-[#5C5C5C] text-sm">{item.speciality}</p>
                  </div>

                  {item?.country && (
                    <div className="text-gray-600 text-sm flex flex-col">
                      <p className="font-medium">{item.country}</p>
                      {item.state && (
                        <p className="text-gray-500">{item.state}</p>
                      )}
                      {item.city && (
                        <p className="text-gray-400">{item.city}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;

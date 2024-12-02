import React from "react";
import { assets } from "../assets/assets";
import { useHospitalInsurance } from "../context/HospitalInsuranceContext";

const MedicalInsuranceList = () => {
  const { hospitals, insurances, loading } = useHospitalInsurance();
  console.log(hospitals, insurances, loading, "ranjansah");

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row flex-wrap rounded-lg px-6 md:px-10 lg:px-20 bg-[#2563eb]">
        {/* --------- Header Left --------- */}
        <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
          <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
            Hospital Network <br />& Medical Insurance
          </p>
          <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
            <p>
              Medical insurance helps cover the cost of medical expenses,
              ensuring you have access to quality healthcare when you need it
              most.
            </p>
          </div>
        </div>

        {/* --------- Header Right --------- */}
        <div className="md:w-1/2 relative">
          <img
            className="w-full md:absolute bottom-0 h-auto rounded-lg"
            src={assets.appointment_img}
            alt="Medical Insurance"
          />
        </div>
      </div>

      {/* --------- Hospital and Insurance List --------- */}
      <div className="bg-white py-12 px-6 md:px-20 mt-12 rounded-lg">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-[#2563eb] mb-6">
          Trusted Hospitals & Insurance Providers
        </h2>

        {/* --------- Hospitals and Insurances Grid --------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hospitals?.map((hospitalItem, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-[#2563eb] mb-4">
                {hospitalItem.name}
              </h3>
              <ul className="list-none space-y-3 text-gray-700">
                {hospitalItem.insurances.map((insurance, i) => {
                  // Match the insurance by ID
                  //   const insurance = insurances.find(
                  //     (ins) => ins._id === insuranceId
                  //   );
                  return (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm md:text-base"
                    >
                      <img
                        className="w-6 h-6 rounded-full"
                        src={assets.insurance_icon}
                        alt="Insurance Icon"
                      />
                      {insurance ? insurance : "Insurance not found"}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MedicalInsuranceList;

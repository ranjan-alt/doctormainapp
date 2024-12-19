import React from "react";
import { useContext } from "react";
import { SurgeryContext } from "../context/SurgeryContext";
import { useState } from "react";
const Surgeries = () => {
  const { handleSubmitSurgeryQueries, handleChange, formData, setFormData } =
    useContext(SurgeryContext);

  const surgeriesAndProcedures = [
    {
      surgery: "General Surgery",
      procedures: [
        { name: "Knee Replacement", icon: "🦵" },
        { name: "Hip Replacement", icon: "🦴" },
        { name: "Gallbladder Removal (Cholecystectomy)", icon: "🍏" },
        { name: "Hernia Repair", icon: "🦠" },
        { name: "Appendectomy", icon: "✂️" },
        { name: "Circumcision", icon: "✂️" },
        { name: "Liposuction", icon: "💪" },
        { name: "Breast Reduction/Augmentation", icon: "🦋" },
        { name: "Lump in Breast", icon: "🍒" },
        { name: "Cleft Lip Surgery", icon: "👄" },
        { name: "Piles Treatment", icon: "💩" },
        { name: "Lymph Node Biopsy", icon: "🦠" },
      ],
    },
    {
      surgery: "Orthopedic Surgery",
      procedures: [
        { name: "Knee Arthroscopy", icon: "🦵" },
        { name: "ACL Repair", icon: "🦵" },
        { name: "Spinal Fusion", icon: "🧘‍♂️" },
        { name: "Discectomy", icon: "💥" },
        { name: "Shoulder Arthroscopy", icon: "💪" },
        { name: "Rotator Cuff Surgery", icon: "🦋" },
        { name: "Carpal Tunnel Surgery", icon: "✋" },
        { name: "Arthroscopy (General)", icon: "🏃‍♂️" },
        { name: "Foot Surgery", icon: "🦶" },
      ],
    },
    {
      surgery: "Cardiovascular Surgery",
      procedures: [
        { name: "Open Heart Surgery", icon: "❤️" },
        { name: "Coronary Artery Bypass Grafting (CABG)", icon: "🫀" },
        { name: "Angioplasty", icon: "🚶‍♂️" },
        { name: "Aortic Valve Replacement", icon: "💓" },
        { name: "Pacemaker Surgery", icon: "⏰" },
        { name: "Cardiothoracic Surgery", icon: "💓" },
        { name: "Balloon Angioplasty", icon: "🎈" },
        { name: "Bypass Surgery", icon: "🛣️" },
        { name: "Heart Valve Surgery", icon: "🏥" },
      ],
    },
    {
      surgery: "Urology & Renal Surgery",
      procedures: [
        { name: "Kidney Transplant", icon: "🧬" },
        { name: "Lithotripsy (Kidney Stone Removal)", icon: "💎" },
        { name: "Prostatectomy", icon: "🔴" },
        { name: "Bladder Cancer Surgery", icon: "🔴" },
        { name: "Vasectomy", icon: "🔒" },
        { name: "Cystectomy", icon: "💧" },
        { name: "Dialysis", icon: "💉" },
      ],
    },
    {
      surgery: "Gynecological Surgery",
      procedures: [
        { name: "C-Section", icon: "👶" },
        { name: "Hysterectomy", icon: "🩸" },
        { name: "Myomectomy", icon: "🌸" },
        { name: "Labiaplasty", icon: "👙" },
        { name: "Ovarian Cyst Surgery", icon: "🥚" },
        { name: "Endometriosis Surgery", icon: "🌸" },
        { name: "Vaginal Tightening", icon: "🔒" },
        { name: "IVF (In Vitro Fertilization)", icon: "🍼" },
      ],
    },
    {
      surgery: "Neurosurgery",
      procedures: [
        { name: "Brain Surgery", icon: "🧠" },
        { name: "Deep Brain Stimulation (DBS)", icon: "🧠" },
        { name: "Craniotomy", icon: "💀" },
        { name: "Spinal Cord Surgery", icon: "🧘‍♂️" },
        { name: "Epilepsy Surgery", icon: "⚡" },
        { name: "Discectomy", icon: "📉" },
        { name: "Laminectomy", icon: "🧠" },
        { name: "Cranial Nerve Surgery", icon: "👂" },
      ],
    },
    {
      surgery: "Plastic Surgery",
      procedures: [
        { name: "Rhinoplasty (Nose Job)", icon: "👃" },
        { name: "Breast Augmentation/Reduction", icon: "👗" },
        { name: "Liposuction", icon: "🧘‍♀️" },
        { name: "Facelift", icon: "😁" },
        { name: "Tummy Tuck", icon: "🏋️‍♀️" },
        { name: "Burn Reconstruction", icon: "🔥" },
        { name: "Hand Surgery", icon: "🤲" },
        { name: "Abdominoplasty", icon: "💪" },
      ],
    },
    {
      surgery: "Cancer Surgery",
      procedures: [
        { name: "Breast Cancer Surgery", icon: "🥥" },
        { name: "Lung Cancer Surgery", icon: "🫁" },
        { name: "Colon Cancer Surgery", icon: "🧻" },
        { name: "Pancreatic Cancer Surgery", icon: "🍍" },
        { name: "Brain Tumor Surgery", icon: "🧠" },
        { name: "Ovarian Cancer Surgery", icon: "🌸" },
      ],
    },
    {
      surgery: "Eye Surgery",
      procedures: [
        { name: "Cataract Surgery", icon: "👁️" },
        { name: "LASIK", icon: "👓" },
        { name: "Glaucoma Surgery", icon: "👀" },
        { name: "Squint Surgery", icon: "🫣" },
      ],
    },
    {
      surgery: "Ear, Nose & Throat (ENT) Surgery",
      procedures: [
        { name: "Tonsillectomy", icon: "🤧" },
        { name: "Septoplasty", icon: "👃" },
        { name: "Sinus Surgery", icon: "🌬️" },
        { name: "Mastoidectomy", icon: "🦻" },
        { name: "Sleep Apnea Surgery", icon: "😴" },
        { name: "Thyroid Surgery", icon: "🔮" },
      ],
    },
    {
      surgery: "Gastrointestinal Surgery",
      procedures: [
        { name: "Bariatric Surgery", icon: "🍔" },
        { name: "Colonoscopy", icon: "🍽️" },
        { name: "Gastrectomy", icon: "🍲" },
        { name: "Gastric Bypass Surgery", icon: "🍽️" },
        { name: "Hernia Surgery", icon: "💥" },
      ],
    },
    {
      surgery: "Transplants",
      procedures: [
        { name: "Liver Transplant", icon: "🧬" },
        { name: "Lung Transplant", icon: "🌬️" },
        { name: "Kidney Transplant", icon: "🧬" },
      ],
    },
    {
      surgery: "Miscellaneous Surgeries",
      procedures: [
        { name: "Hair Transplant", icon: "💇‍♂️" },
        { name: "Vascular Surgery", icon: "💉" },
        { name: "Pacemaker Insertion", icon: "🕰️" },
        { name: "Cryotherapy", icon: "❄️" },
        { name: "Bone Marrow Biopsy", icon: "🩸" },
      ],
    },
    {
      surgery: "Cosmetic & Aesthetic Surgery",
      procedures: [
        { name: "Brow Lift", icon: "🎭" },
        { name: "Eyelid Surgery (Blepharoplasty)", icon: "👀" },
        { name: "Cheek Implants", icon: "🍑" },
        { name: "Chin Implants", icon: "👑" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-5 md:p-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section - Surgery Grid */}
        <div className="col-span-1 lg:col-span-2">
          <h1 className="text-2xl font-bold mb-6">Surgeries and Procedures</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {surgeriesAndProcedures.map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-blue-600 mb-4">
                  {item.surgery}
                </h2>
                <ul className="list-disc list-inside text-gray-700">
                  {item.procedures.map((procedure, index) => (
                    <li key={index} className="text-sm mb-2 flex items-center">
                      <span className="mr-2">{procedure.icon}</span>
                      {procedure.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - Fixed Appointment Form */}
        <div className="relative md:fixed top-1/2 md:right-3 left:3 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-md rounded-lg w-full sm:max-w-[640px] md:max-w-sm md:w-80">
          <h2 className="text-xl font-semibold mb-4">
            Book your consultation today
          </h2>
          <form onSubmit={handleSubmitSurgeryQueries} className="space-y-4">
            {/* City Select */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                City
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              >
                <option value="">Select City</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
              </select>
            </div>

            {/* Surgery Select */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Select Surgery
              </label>
              <select
                name="surgery"
                value={formData.surgery}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              >
                <option value="">Select Surgery</option>
                {surgeriesAndProcedures.map((item, index) => (
                  <option key={index} value={item.surgery}>
                    {item.surgery}
                  </option>
                ))}
              </select>
            </div>

            {/* Procedure Select */}
            {formData.surgery && (
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-600">
                  Select Procedure
                </label>
                <select
                  name="procedure"
                  value={formData.procedure}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="">Select Procedure</option>
                  {surgeriesAndProcedures
                    .find((item) => item.surgery === formData.surgery)
                    ?.procedures.map((procedure, index) => (
                      <option key={index} value={procedure.name}>
                        {procedure.icon} {procedure.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            {/* Name Input */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>

            {/* Phone Input */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Book Appointment
            </button>
          </form>
          {/* Terms */}
          <p className="text-xs text-center mt-3 text-gray-500">
            By submitting the form, you agree to medicare{" "}
            <a href="#" className="text-blue-600">
              T&C
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Surgeries;

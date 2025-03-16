import { useState, useEffect } from "react";

const RegisterUser = () => {
  const [userId, setUserId] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");

  // Function to generate 8-digit User ID
  const generateUserId = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };

  useEffect(() => {
    setUserId(generateUserId());
    setRegistrationDate(new Date().toISOString().split("T")[0]); // Set today's date
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
          Register Patient
        </h1>

        {/* User ID (Auto-generated) */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-1">
            User ID:
          </label>
          <input
            type="text"
            value={userId}
            readOnly
            className="w-full p-2 border rounded-lg bg-gray-200"
          />
        </div>

        {/* Registration Date */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-1">
            Registration Date:
          </label>
          <input
            type="date"
            value={registrationDate}
            readOnly
            className="w-full p-2 border rounded-lg bg-gray-200"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-1">Email:</label>
          <input
            type="email"
            placeholder="Enter email"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-1">
            Phone Number:
          </label>
          <input
            type="text"
            placeholder="Enter phone number"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Enrollment Location (Hospital) */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-1">
            Enrollment Location (Hospital):
          </label>
          <input
            type="text"
            placeholder="Enter hospital name"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Send Notification */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="sendNotification"
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="sendNotification" className="ml-2 text-gray-600">
            Send Notification
          </label>
        </div>

        {/* Submit Button */}
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterUser;

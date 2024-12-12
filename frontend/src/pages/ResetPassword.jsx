import React, { useContext, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const token = searchParams.get("token");
  const { backendUrl } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setErrorMessage("Password must be at least 8 characters long");
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/user/reset-password`,
        {
          newPassword,
          token,
        }
      );

      console.log("ranjan");
      if (response.data.success) {
        setSuccessMessage("Password reset successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login"); // Redirect to login page
        }, 2000);
      } else {
        setErrorMessage(response.data.message || "Something went wrong");
      }
    } catch (error) {
      setErrorMessage("Failed to reset password. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold">Reset Password</p>
        <p>Enter password</p>

        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}

        <div className="w-full">
          <p>New Password</p>
          <input
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>

        <div className="w-full">
          <p>Confirm Password</p>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>

        <button className="bg-[#2563eb] text-white w-full py-2 my-2 rounded-md text-base">
          Reset Password
        </button>
      </div>
    </form>
  );
};

export default ResetPassword;

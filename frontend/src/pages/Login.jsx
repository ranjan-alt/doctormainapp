import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Sign Up");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === "Sign Up") {
      const { data } = await axios.post(backendUrl + "/api/user/register", {
        name,
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      } else {
        toast.error(data.message);
      }
    } else if (state === "Login") {
      const { data } = await axios.post(backendUrl + "/api/user/login", {
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      } else {
        toast.error(data.message);
      }
    } else if (state === "Forgot Password") {
      const { data } = await axios.post(
        backendUrl + "/api/user/requestPasswordReset",
        {
          email,
        }
      );

      if (data.success) {
        toast.success("Password reset link sent to your email");
      } else {
        toast.error(data.message);
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
    // Prevent redirect if user is on the reset password page
    if (
      token &&
      window.location.pathname !== "/frontend/requestPasswordReset"
    ) {
      navigate("/");
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up"
            ? "Create Account"
            : state === "Login"
            ? "Login"
            : "Reset Password"}
        </p>
        <p>
          {state === "Sign Up"
            ? "Please sign up to book appointment"
            : state === "Login"
            ? "Please log in to book appointment"
            : "Enter your email to reset your password"}
        </p>
        {state === "Sign Up" && (
          <div className="w-full ">
            <p>Full Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="text"
              required
            />
          </div>
        )}
        {(state === "Sign Up" ||
          state === "Login" ||
          state === "Forgot Password") && (
          <div className="w-full ">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="email"
              required
            />
          </div>
        )}
        {(state === "Login" || state === "Sign Up") && (
          <div className="w-full ">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="password"
              required
            />
          </div>
        )}
        <button className="bg-[#2563eb] text-white w-full py-2 my-2 rounded-md text-base">
          {state === "Sign Up"
            ? "Create account"
            : state === "Login"
            ? "Login"
            : "Reset Password"}
        </button>
        {state === "Sign Up" && (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        )}
        {state === "Login" && (
          <>
            <p>
              Create a new account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-primary underline cursor-pointer"
              >
                Click here
              </span>
            </p>
            <p>
              Forgot your password?{" "}
              <span
                onClick={() => setState("Forgot Password")}
                className="text-primary underline cursor-pointer"
              >
                Reset here
              </span>
            </p>
          </>
        )}
        {state === "Forgot Password" && (
          <p>
            Remember your password?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;

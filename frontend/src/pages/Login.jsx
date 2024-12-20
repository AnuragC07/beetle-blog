import React, { useState } from "react";
import Logo from "../assets/beetle.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Function to get JWT token from local storage
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };

  // Create an Axios instance with default configuration
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/", // Your server base URL
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add a request interceptor to attach JWT token to all requests
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Logging in..."); // Show loading toast
    try {
      const response = await axiosInstance.post("/signin", {
        email,
        password,
      });
      if (response.data.token) {
        // Store the token in local storage upon successful login
        localStorage.setItem("jwtToken", response.data.token);
        // Redirect to home page upon successful login
        toast.success("Login Successfull!");
        navigate("/home");
      } else {
        toast.error(response.data.error); // Display error message if login fails
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Invalid Email or Password! Please try again.");
    } finally {
      toast.dismiss(); // Dismiss loading toast when login process ends
    }
  };

  return (
    <div>
      <img src={Logo} alt="beetle logo" className="m-5" />
      <div id="body" className="flex flex-col justify-center items-center">
        <div className="flex flex-col gap-5 mt-10 justify-center items-center">
          <h1 className="text-4xl lg:text-5xl font-medium  text-stone-700 font-title">
            Welcome back!
          </h1>
          <h3 className="text-xl font-subtitle text-stone-400 font-semibold">
            Let's get you logged in
          </h3>
        </div>

        <form
          className="w-3/4 border border-zinc-100 bg-white rounded-xl shadow-lg lg:w-1/4 m-8 mt-10 flex flex-col gap-5 p-10 pl-11"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col ">
            <label className="text-base text-slate-600 font-normal">
              Email
            </label>
            <input
              type="email"
              className="border border-slate-200 w-full bg-white rounded-md h-10 pl-3 font-normal mt-1 text-sm"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col ">
            <label className="text-base text-slate-600 font-normal">
              Password
            </label>
            <input
              type="password"
              className="border border-slate-200 w-full bg-white rounded-md h-10 pl-3 font-normal mt-1 text-sm"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button className=" mt-5 bg-stone-800 text-white h-10 text-sm p-1 w-full lg:mt-20 rounded-md font-subtitle font-medium">
              Sign in
            </button>
          </div>
        </form>

        <div>
          <h1 className="text-lg text-stone-600 font-subtitle font-semibold">
            New here?{" "}
            <Link
              to="/signup"
              className="text-lg text-stone-800 font-subtitle font-semibold"
            >
              Sign up
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import Logo from "../assets/beetle.svg";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://beetle-backend.onrender.com/signup",
        formData
      );
      // console.log(response.data);
      navigate("/signin");
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  return (
    <div>
      <img src={Logo} alt="beetle logo" className="m-5" />
      <div id="body" className="flex flex-col justify-center items-center">
        <div className="flex flex-col gap-5 mt-2 lg:mt-10 justify-center items-center">
          <h1 className="text-4xl lg:text-5xl font-medium  text-stone-700 font-title">
            Glad to have you here!
          </h1>
          <h3 className="text-xl font-subtitle text-stone-400 font-semibold">
            Lets quickly set everything up
          </h3>
        </div>

        <form
          className="w-3/4 border border-zinc-100 bg-white rounded-xl shadow-lg lg:w-1/4 m-5 mt-10 flex flex-col gap-1 lg:gap-3 p-8 lg:p-10 pl-11"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col ">
            <label className="text-base text-slate-600 font-normal">
              Username
            </label>
            <input
              type="text"
              className="border border-slate-200 w-full bg-white rounded-md h-10 pl-3 font-normal mt-1 text-sm"
              placeholder="Enter your username"
              required
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col ">
            <label className="text-base text-slate-600 font-normal">
              Email
            </label>
            <input
              type="text"
              className="border border-slate-200 w-full bg-white rounded-md h-10 pl-3 font-normal mt-1 text-sm"
              placeholder="Enter your email address"
              required
              name="email"
              onChange={handleChange}
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
              required
              name="password"
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              className="bg-stone-800 text-white h-10 text-sm p-1 w-full mt-6  lg:mt-10 rounded-md font-subtitle font-medium"
              type="submit"
            >
              Sign up
            </button>
          </div>
        </form>

        <div>
          <h1 className="text-lg text-stone-600 font-subtitle font-semibold">
            already an user?{" "}
            <Link
              to="/signin"
              className="text-lg text-stone-800 font-subtitle font-semibold"
            >
              Login
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Register;

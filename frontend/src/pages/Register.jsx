import React, { useState } from "react";
import Logo from "../assets/beetle2.svg";
import { Link, useNavigate } from "react-router-dom";
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
        "http://localhost:8000/signup",
        formData
      );
      // console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className="bg-stone-900">
      <div className="flex justify-center items-center">
        <img src={Logo} alt="beetle logo" className="p-5 bg-stone-900" />
      </div>
      <div
        id="body"
        className="flex flex-col justify-center items-center bg-stone-900"
      >
        <div className="flex flex-col gap-5 mt-10 justify-center items-center bg-stone-900">
          <h1 className="text-4xl lg:text-5xl font-medium text-stone-400 font-title">
            Glad to have you here!
          </h1>
          <h3 className="text-xl font-subtitle text-stone-600 font-semibold">
            Lets quickly set everything up
          </h3>
        </div>

        <form
          className="w-3/4 bg-stone-800 rounded-xl shadow-lg lg:w-1/4 m-8 mt-9 flex flex-col gap-5 p-10 pl-11"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col ">
            <label className="text-base text-stone-500 font-normal bg-stone-800">
              Username
            </label>
            <input
              type="text"
              className="border border-stone-700 w-full bg-stone-800 rounded-md h-10 pl-3 font-normal mt-1 text-sm placeholder:text-stone-500 outline-none text-stone-300 font-subtitle"
              placeholder="Enter your username"
              required
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col ">
            <label className="text-base text-stone-500 font-normal bg-stone-800">
              Email
            </label>
            <input
              type="text"
              className="border border-stone-700 w-full bg-stone-800 rounded-md h-10 pl-3 font-normal mt-1 text-sm placeholder:text-stone-500 outline-none text-stone-300 font-subtitle"
              placeholder="Enter your email address"
              required
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col ">
            <label className="text-base text-stone-500 font-normal bg-stone-800">
              Password
            </label>
            <input
              type="password"
              className="border border-stone-700 w-full bg-stone-800 rounded-md h-10 pl-3 font-normal mt-1 text-sm placeholder:text-stone-500 outline-none text-stone-300"
              placeholder="Enter password"
              required
              name="password"
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              className="mt-5 bg-stone-900 text-white h-10 text-sm p-1 w-full lg:mt-4 rounded-md font-subtitle font-medium"
              type="submit"
            >
              Sign up
            </button>
          </div>
        </form>

        <div className="h-7">
          <h1 className="text-lg text-stone-600 font-subtitle font-semibold">
            already an user?{" "}
            <Link
              to="/signin"
              className="text-lg text-stone-400 font-subtitle font-semibold ml-2"
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

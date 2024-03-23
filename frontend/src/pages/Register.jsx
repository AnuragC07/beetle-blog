import React, { useState } from "react";
import Logo from "../assets/beetle.svg";
import { Link } from "react-router-dom";
import "./register.css";
import axios from "axios";

const Register = () => {
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
      console.log(response.data);
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  return (
    <div>
      <img src={Logo} alt="beetle logo" className="m-5" />
      <div id="body" className="flex flex-col justify-center items-center">
        <div className="flex flex-col gap-5 mt-10 justify-center items-center">
          <h1 className="text-3xl text-slate-600">Glad to have you here!</h1>
          <h3 className="text-base font-light text-slate-400">
            Lets quickly set everything up
          </h3>
        </div>

        <form
          className="border border-zinc-100 bg-white rounded-xl shadow-lg w-1/4 m-10 mt-10 flex flex-col gap-3 p-10 pl-11"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col ">
            <label className="text-xs text-slate-400 font-normal">
              username
            </label>
            <input
              type="text"
              className="border border-slate-200 w-full bg-white rounded-md h-8 pl-3 font-light mt-1 text-sm"
              placeholder="enter your username"
              required
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col ">
            <label className="text-xs text-slate-400 font-normal">email</label>
            <input
              type="text"
              className="border border-slate-200 w-full bg-white rounded-md h-8 pl-3 font-light mt-1 text-sm"
              placeholder="enter your email address"
              required
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col ">
            <label className="text-xs text-slate-400 font-normal">
              password
            </label>
            <input
              type="password"
              className="border border-slate-200 w-full bg-white rounded-md h-8 pl-3 font-light mt-1 text-sm"
              placeholder="enter password"
              required
              name="password"
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              className="bg-zinc-800 text-white h-10 text-sm p-1 w-full mt-10 rounded-md"
              type="submit"
            >
              Sign up
            </button>
          </div>
        </form>

        <div>
          <h1>
            not new here? <Link to="/signin">Login</Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Register;

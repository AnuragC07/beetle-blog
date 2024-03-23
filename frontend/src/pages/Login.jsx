import React, { useState } from "react";
import Logo from "../assets/beetle.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/signin", {
        email,
        password,
      });
      if (response.data === "Success") {
        // Redirect to home page upon successful login
        navigate("/home");
      } else {
        alert(response.data); // Display error message if login fails
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div>
      <img src={Logo} alt="beetle logo" className="m-5" />
      <div id="body" className="flex flex-col justify-center items-center">
        <div className="flex flex-col gap-5 mt-10 justify-center items-center">
          <h1 className="text-3xl text-slate-600">Welcome back!</h1>
          <h3 className="text-base font-light text-slate-400">
            Let's get you logged in
          </h3>
        </div>

        <form
          className="border border-zinc-100 bg-white rounded-xl shadow-lg w-1/4 m-10 mt-10 flex flex-col gap-5 p-10 pl-11"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col ">
            <label className="text-xs text-slate-400 font-normal">Email</label>
            <input
              type="email"
              className="border border-slate-200 w-full bg-white rounded-md h-8 pl-3 font-light mt-1 text-sm"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col ">
            <label className="text-xs text-slate-400 font-normal">
              Password
            </label>
            <input
              type="password"
              className="border border-slate-200 w-full bg-white rounded-md h-8 pl-3 font-light mt-1 text-sm"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button className="bg-zinc-800 text-white h-10 text-sm p-1 w-full mt-20 rounded-md">
              Sign in
            </button>
          </div>
        </form>

        <div>
          <h1>
            New here? <Link to="/signup">Sign up</Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;

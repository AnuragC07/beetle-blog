import React from "react";
import Logo from "../assets/beetle.svg";
import { Link } from "react-router-dom";
import "./register.css";
const Register = () => {
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

        <div className="border border-zinc-100 bg-white rounded-xl shadow-lg w-1/4 m-10 mt-10 flex flex-col gap-3 p-10 pl-11">
          <div className="flex flex-col ">
            <label className="text-xs text-slate-400 font-normal">
              username
            </label>
            <input
              type="text"
              className="border border-slate-200 w-full bg-white rounded-md h-8 pl-3 font-light mt-1 text-sm"
              placeholder="enter your username"
            />
          </div>
          <div className="flex flex-col ">
            <label className="text-xs text-slate-400 font-normal">email</label>
            <input
              type="text"
              className="border border-slate-200 w-full bg-white rounded-md h-8 pl-3 font-light mt-1 text-sm"
              placeholder="enter your email address"
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
            />
          </div>
          <div>
            <button className="bg-zinc-800 text-white h-10 text-sm p-1 w-full mt-10 rounded-md">
              Sign up
            </button>
          </div>
        </div>

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

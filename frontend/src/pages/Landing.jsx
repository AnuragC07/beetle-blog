import React from "react";
import Logo from "../assets/beetle.svg";
import illustration from "../assets/Designer__7_-removebg-preview.png";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <div className="flex justify-center items-center m-5">
        <img src={Logo} alt="" />
      </div>
      <div className="flex flex-row p-2 mx-15 justify-around">
        <img
          src={illustration}
          alt=""
          className="w-2/4 flex justify-center items-center ml-15"
        />
        <div className="flex flex-col justify-between p-2 pl-10 mt-5 w-3/4">
          <div>
            <h1 className="text-6xl font-title w-3/4">Empowering Minds.</h1>
            <h2 className="text-2xl font-subtitle w-3/4 text-stone-400 font-semibold mt-10">
              Discover stories from all around the world or let your own ideas
              take flight!
            </h2>
          </div>
          <Link to="/signin">
            <button className=" bg-stone-900 text-white px-5 py-2 w-32 rounded-sm mb-5">
              Get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;

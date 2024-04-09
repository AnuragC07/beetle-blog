import React from "react";
import Logo from "../assets/beetle.svg";
import illustration from "../assets/Designer__7_-removebg.png";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <div className="flex flex-row  mx-15 justify-around">
        <div className="flex flex-col">
          <div className="flex justify-start items-center m-5">
            <img src={Logo} alt="" />
          </div>
          <img
            src={illustration}
            alt=""
            className="w-full flex justify-center items-center ml-15 h-screen p-10 mr-16"
          />
        </div>
        <div className="flex flex-col justify-between  pl-10  w-2/4 p-16 bg-stone-100 shadow-xl ">
          <div>
            <h1 className="text-6xl font-title w-3/4">Empowering Minds.</h1>
            <h2 className="text-4xl font-subtitle w-3/4 text-stone-400 font-semibold mt-16">
              Discover stories from all around the world
              <br /> or let your own ideas take flight!
            </h2>
          </div>
          <Link to="/signin">
            <button className=" bg-stone-900 text-white px-5 py-2 w-32 rounded-md mb-5">
              Get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;

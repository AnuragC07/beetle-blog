import React from "react";
import Logo from "../assets/beetle2.svg";
import illustration from "../assets/Designer__7_-removebg.png";
import { Link } from "react-router-dom";
import grid from "./../assets/Vectorgf.png";
import hero from "./../assets/Redefine perspectives real.svg";
import buttonimg from "./../assets/black btn.svg";
import categories from "./../assets/Group 17.png";
import hero2 from "./../assets/Redefine perspectives.svg";

const Landing = () => {
  return (
    <div className="bg-stone-900">
      <nav className="flex justify-center items-center py-14">
        <img src={Logo} alt="" />
      </nav>
      <section className="relative">
        <div className="flex justify-center items-center">
          <div className="absolute top-14">
            <div className="flex flex-col items-center">
              <img src={hero} alt="" />
              <p className="text-amber-100 text-lg font-title mt-10 w-96 text-center">
                Discover stories from all around the world or let your own ideas
                take flight
              </p>
            </div>
            <Link to="/signin">
              <div className="flex items-center justify-center">
                <img src={buttonimg} alt="" className="h-12 w-32 mt-16" />
              </div>
            </Link>
          </div>
        </div>
        <img src={grid} alt="" className="w-full" />
      </section>
      <section className="flex flex-col justify-center items-center">
        <img src={hero2} alt="" />
        <img src={categories} alt="" className="mt-10" />
        <p className="text-white text-lg font-title mt-10 w-96 text-center">
          We provide you with minimalistic and clutter free experience so you
          can express yourself your way
        </p>
      </section>
      <footer className="flex justify-center items-center">
        <img src={Logo} alt="" className="py-20 mt-20" />
      </footer>
    </div>
  );
};

export default Landing;

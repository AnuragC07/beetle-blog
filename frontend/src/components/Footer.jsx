import React from "react";
import Logo from "../assets/beetle2.svg";

const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 bg-stone-950 p-5 pt-10">
      <img src={Logo} alt="" />
      <div className="flex flex-col justify-center items-center text-white">
        <p className="mt-10 mb-2 text-white">About Us</p>
        <p className=" text-white">Made with 🤍 by Anurag C07</p>
      </div>
    </div>
  );
};

export default Footer;

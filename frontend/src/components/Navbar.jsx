import React from "react";
import Logo from "../assets/beetle.svg";
import UserPic from "../assets/pexels-eric-w-3375230.jpg";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem("jwtToken");

  return (
    <div className="flex justify-between m-5">
      <Link to="/home">
        <img src={Logo} alt="" />
      </Link>

      <div id="lists" className="flex justify-center items-center gap-8 mr-10">
        <Link to="/create">
          <p className="text-gray-700 cursor-pointer">Create</p>
        </Link>

        {isLoggedIn ? (
          // If user is logged in, display "Logout" link
          <Link to="/logout">
            <p className="text-gray-600 cursor-pointer">Logout</p>
          </Link>
        ) : (
          // If user is not logged in, display "Login" link
          <Link to="/signin">
            <p className="text-gray-600 cursor-pointer">Login</p>
          </Link>
        )}

        <p className="text-gray-600 cursor-pointer">About</p>
        <Link to="/user">
          <img
            src={UserPic}
            alt=""
            className="h-12 w-12 rounded-full border border-gray-400 bg-contain cursor-pointer"
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

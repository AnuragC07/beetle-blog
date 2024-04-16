import React, { useState } from "react";
import Logo from "../assets/beetle.svg";
import UserPic from "../assets/pexels-eric-w-3375230.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem("jwtToken");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Remove the JWT token from localStorage
    localStorage.removeItem("jwtToken");
    // Close the logout modal
    setShowLogoutModal(false);
    // Optionally, you can also redirect the user to the login page or any other page
    // window.location.href = "/login"; // Redirect to login page
    navigate("/");
  };

  return (
    <div className="flex flex-row justify-between p-4 fixed top-0 w-full bg-white backdrop-blur-xl h-16 z-40">
      <Link to="/home">
        <img src={Logo} alt="" />
      </Link>

      <div className="hidden lg:flex lg:items-center">
        <div
          id="lists"
          className="flex lg:flex-row lg:justify-center lg:items-center gap-8 mr-10 p-4"
        >
          <Link
            to="/create"
            className="flex justify-between gap-2 px-4 py-2 rounded-3xl shadow-md w-28 border-2 border-stone-100"
          >
            <CreateRoundedIcon className=" text-black  rounded-full " />
            <p className="text-stone-700 cursor-pointer font-semibold ">
              Write
            </p>
          </Link>

          <Link to="/user">
            <p className="text-stone-800 cursor-pointer font-subtitle font-semibold">
              You
            </p>
          </Link>
          <hr className="border-r border-stone-400 h-7" />
          <p className="text-stone-500 cursor-pointer font-subtitle font-semibold">
            About
          </p>
          {isLoggedIn ? (
            // If user is logged in, display "Logout" link
            <>
              <p
                className="text-stone-300 cursor-pointer font-subtitle font-semibold"
                onClick={() => setShowLogoutModal(true)}
              >
                Logout
              </p>
              {/* Logout Modal */}
              {showLogoutModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 h-screen">
                  <div className="bg-white flex flex-col justify-between p-8 max-w-md mx-auto rounded-lg  mt-0 shadow-lg h-40 z-40">
                    <div>
                      <p>Are you sure you want to logout?</p>
                    </div>
                    <div className="mt-4 flex gap-5  justify-end">
                      <button
                        onClick={handleLogout}
                        className="bg-stone-700 text-white px-4 py-2 rounded-lg mr-2"
                      >
                        Logout
                      </button>
                      <button
                        onClick={() => setShowLogoutModal(false)}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            // If user is not logged in, display "Login" link
            <button className="bg-stone-700 text-white h-10 w-20 text-sm p-1 font-subtitle rounded-md font-light items-end">
              <Link to="/signin" className="bg-stone-700 w-12">
                <p className="text-white font-semibold cursor-pointer">Login</p>
              </Link>
            </button>
          )}
        </div>
      </div>
      {/* Hamburger Menu Icon */}
      <MenuIcon
        className="relative lg:text-white lg:cursor-default flex lg: cursor-pointer text-stone-700 mr-4"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />

      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } absolute right-4 top-10 lg:hidden flex-col bg-white h-fit  rounded-lg shadow-xl  lg:flex-row lg:justify-center lg:items-center gap-8 m-0 lg:mr-10 p-4 ease-in`}
      >
        <Link
          to="/create"
          className="flex justify-between gap-2 px-4 py-2 rounded-3xl shadow-md w-28 border-2 border-stone-100"
        >
          <CreateRoundedIcon className=" text-black  rounded-full " />
          <p className="text-stone-700 cursor-pointer font-semibold ">Write</p>
        </Link>

        <Link to="/user">
          <p className="text-stone-800 cursor-pointer font-subtitle font-semibold">
            You
          </p>
        </Link>
        <hr className="border-r hidden lg:border-stone-400 h-7" />
        <p className="text-stone-500 cursor-pointer font-subtitle font-semibold">
          About
        </p>
        {isLoggedIn ? (
          // If user is logged in, display "Logout" link
          <>
            <p
              className="text-stone-300 cursor-pointer font-subtitle font-semibold"
              onClick={() => setShowLogoutModal(true)}
            >
              Logout
            </p>
            {/* Logout Modal */}
            {showLogoutModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 h-screen mt-20">
                <div className="bg-white flex flex-col justify-between p-8 max-w-md mx-auto rounded-lg  mt-0 shadow-lg h-40 z-40">
                  <div>
                    <p>Are you sure you want to logout?</p>
                  </div>
                  <div className="mt-4 flex gap-5  justify-end">
                    <button
                      onClick={handleLogout}
                      className="bg-red-600 lg:bg-red-600 text-white px-4 py-2 rounded-lg mr-2"
                    >
                      Logout
                    </button>
                    <button
                      onClick={() => setShowLogoutModal(false)}
                      className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          // If user is not logged in, display "Login" link
          <button className="bg-stone-700 text-white h-10 w-20 text-sm p-1 font-subtitle rounded-md font-light items-end">
            <Link to="/signin" className="bg-stone-700 w-12">
              <p className="text-white font-semibold cursor-pointer">Login</p>
            </Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;

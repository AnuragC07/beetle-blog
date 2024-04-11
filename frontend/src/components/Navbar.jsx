import React, { useState } from "react";
import Logo from "../assets/beetle.svg";
import UserPic from "../assets/pexels-eric-w-3375230.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
const Navbar = () => {
  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem("jwtToken");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
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
    <div className="flex justify-between m-5">
      <Link to="/home">
        <img src={Logo} alt="" />
      </Link>

      <div id="lists" className="flex justify-center items-center gap-8 mr-10">
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
              <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white flex flex-col justify-between p-8 max-w-md mx-auto rounded-lg shadow-lg h-60">
                  <div>
                    <h2 className="text-xl font-bold mb-4font-subtitle ">
                      Logout
                    </h2>
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
  );
};

export default Navbar;

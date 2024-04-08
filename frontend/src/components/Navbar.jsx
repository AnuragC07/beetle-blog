import React, { useState } from "react";
import Logo from "../assets/beetle.svg";
import UserPic from "../assets/pexels-eric-w-3375230.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
        <Link to="/create">
          <p className="text-gray-700 cursor-pointer">Create</p>
        </Link>

        {isLoggedIn ? (
          // If user is logged in, display "Logout" link
          <>
            <p
              className="text-gray-600 cursor-pointer"
              onClick={() => setShowLogoutModal(true)}
            >
              Logout
            </p>
            {/* Logout Modal */}
            {showLogoutModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white p-8 max-w-md mx-auto rounded-lg shadow-lg">
                  <h2 className="text-xl font-bold mb-4">Logout</h2>
                  <p>Are you sure you want to logout?</p>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
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
          <Link to="/">
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

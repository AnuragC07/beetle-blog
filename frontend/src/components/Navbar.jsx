import React, { useState } from "react";
import Logo from "../assets/beetle2.svg";
import UserPic from "../assets/pexels-eric-w-3375230.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import MenuIcon from "@mui/icons-material/Menu";
import { IoSearchOutline } from "react-icons/io5";
import axios from "axios";
import BlogCard from "./BlogCard";

const Navbar = () => {
  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem("jwtToken");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Function to handle logout
  const handleLogout = () => {
    // Remove the JWT token from localStorage
    localStorage.removeItem("jwtToken");
    // Close the logout modal
    setShowLogoutModal(false);

    navigate("/");
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/search?query=${query}`
      );
      setResults(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error searching blogs", error);
    }
  };

  const closeModal = () => {
    console.log("Closing modal");
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="flex flex-row justify-between p-4 fixed top-0 w-full bg-stone-900 backdrop-blur-xl h-16 z-50 border-b border-b-stone-700">
      <Link to="/">
        <img src={Logo} alt="" />
      </Link>

      <div className="hidden lg:flex lg:items-center">
        <div
          id="lists"
          className="flex lg:flex-row lg:justify-center lg:items-center gap-8 mr-10 p-4"
        >
          <div className="bg-stone-900 border border-stone-700 shadow-md px-4 py-2 rounded-2xl flex gap-2 items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search an article"
              className="bg-stone-900 text-stone-200 outline-none w-56 placeholder:text-stone-600 font-subtitle"
            />
            <button onClick={handleSearch}>
              <IoSearchOutline
                color="white"
                size={20}
                className="cursor-pointer"
              />
            </button>
          </div>
          {/* Render the modal when isModalOpen is true */}
          {isModalOpen && (
            <div
              className="absolute top-14 w-auto bg-stone-900 border border-stone-700 rounded-xl p-2 min-w-[800px] mt-2 z-50" // Control opacity for smooth fade-in
            >
              <div className="flex justify-between items-center">
                <h2 className="text-white text-lg ml-14 font-semibold">
                  Search Results
                </h2>
                <button onClick={closeModal} className="text-white mr-2">
                  X
                </button>
              </div>

              <div className="mt-4 max-h-60 overflow-y-auto">
                {results.length > 0 ? (
                  results.map((blog) => (
                    <BlogCard
                      key={blog._id}
                      title={blog.title}
                      author={blog.author}
                      image={`http://localhost:8000/images/${blog.image}`}
                      blog={blog} // Pass the full blog object to BlogCard
                    />
                  ))
                ) : (
                  <p className="text-white">No results found</p>
                )}
              </div>
            </div>
          )}

          <Link
            to="/create"
            className="flex justify-between gap-2 px-4 py-2 rounded-3xl shadow-md w-28 border-2 border-stone-800 bg-stone-800"
          >
            <CreateRoundedIcon className=" text-white  rounded-full " />
            <p className="text-white cursor-pointer font-subtitle">Write</p>
          </Link>
          <hr className="border-r border-stone-400 h-7" />
          <p className="text-stone-400 cursor-pointer font-subtitle font-semibold">
            About
          </p>

          {isLoggedIn ? (
            // If user is logged in, display "Logout" link
            <>
              <Link to="/user">
                <p className="text-stone-400 cursor-pointer font-subtitle font-semibold">
                  You
                </p>
              </Link>
              <p
                className="text-stone-900 hidden font-subtitle font-semibold"
                onClick={() => setShowLogoutModal(true)}
              >
                Logout
              </p>
              {/* Logout Modal */}
              {showLogoutModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 h-screen">
                  <div className="bg-stone-900 flex flex-col justify-between p-8 max-w-md mx-auto rounded-lg  mt-0 shadow-lg h-40 z-40">
                    <div>
                      <p className="text-white">
                        Are you sure you want to logout?
                      </p>
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
        className="relative lg:text-stone-900 lg:cursor-default flex lg: cursor-pointer text-stone-700 mr-4"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />

      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } absolute right-4 top-10 lg:hidden flex-col bg-stone-900 border-stone-600 h-fit  rounded-lg shadow-xl  lg:flex-row lg:justify-center lg:items-center gap-8 m-0 lg:mr-10 p-4 ease-in`}
      >
        <Link
          to="/create"
          className="flex justify-between gap-2 px-4 py-2 rounded-3xl shadow-md w-28 border-2 border-stone-100"
        >
          <CreateRoundedIcon className=" text-white  rounded-full " />
          <p className="text-white cursor-pointer font-semibold ">Write</p>
        </Link>

        <Link to="/user">
          <p className="text-white cursor-pointer font-subtitle font-semibold">
            You
          </p>
        </Link>
        <hr className="border-r hidden lg:border-stone-400 h-7" />
        <p className="text-white cursor-pointer font-subtitle font-semibold">
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

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import axios from "axios";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { HiOutlineBookmarkSlash } from "react-icons/hi2";

const decodeToken = (token) => {
  const payload = token.split(".")[1];
  return JSON.parse(atob(payload));
};

const User = () => {
  const isLoggedIn = !!localStorage.getItem("jwtToken");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [username, setUsername] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState([]);
  const [results, setResults] = useState([]);

  const handleLogout = () => {
    // Remove the JWT token from localStorage
    localStorage.removeItem("jwtToken");
    // Close the logout modal
    setShowLogoutModal(false);
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/", config);
        const filteredBlogs = response.data.data.filter((blog) => {
          return (
            blog.author === decodedToken.username ||
            blog.authorId === decodedToken.id
          );
        });
        setBlogs(filteredBlogs);
        setLoading(false);
      } catch (error) {
        console.log("Axios Error:", error);
      }
    };

    fetchData();

    const decodedToken = decodeToken(token);
    setUsername(decodedToken.username);
  }, []);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`http://localhost:8000/${selectedBlog._id}`, config);
      toast.success("Blog deleted successfully!");
      const updatedBlogs = blogs.filter(
        (blog) => blog._id !== selectedBlog._id
      );
      setBlogs(updatedBlogs);
      setShowDeleteModal(false);
    } catch (error) {
      toast.error("Blog deletion failed!");
    }
  };

  const openDeleteModal = (blog) => {
    setSelectedBlog(blog);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedBlog(null);
    setShowDeleteModal(false);
  };
  useEffect(() => {
    const loadBookmarks = async () => {
      const blogs = await fetchBookmarkedBlogs();
      setBookmarkedBlogs(blogs);
    };

    loadBookmarks();
  }, []);

  const fetchBookmarkedBlogs = async () => {
    try {
      const token = localStorage.getItem("jwtToken"); // Retrieve JWT from localStorage
      const response = await axios.get("http://localhost:8000/api/bookmarks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResults(response.data.bookmarkedBlogs);
    } catch (error) {
      console.error("Full error:", error);
      console.error("Response data:", error.response?.data);
      return [];
    }
  };
  const removeBookmark = async (blogId) => {
    try {
      const token = localStorage.getItem("jwtToken");
      await axios.delete(`http://localhost:8000/bookmark/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookmarkedBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
    } catch (error) {
      console.error("Full error object:", error);
      console.error("Response status:", error.response?.status);
      console.error("Response data:", error.response?.data);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="pt-5 pl-2 pr-2 min-h-screen bg-stone-900">
        <div className="flex gap-2">
          <div className="flex justify-center"></div>
          <div className="w-screen ml-10 mt-20">
            <h1 className="text-amber-100 mt-4 text-3xl font-title">
              hey there, {username}
            </h1>
            <h2 className="text-2xl font-bold mb-3 mt-10 font-subtitle text-stone-400 ">
              Your Blogs
            </h2>
            {loading ? (
              <p>Loading...</p>
            ) : blogs.length === 0 ? (
              <p className="text-xl font-bold font-subtitle text-stone-700">
                No published blogs
              </p>
            ) : (
              <ul className="mt-8 relative">
                {blogs.map((blog, index) => (
                  <li key={index} className="mb-4">
                    {blog.author === username && (
                      <button
                        onClick={() => openDeleteModal(blog)}
                        className="text-white mt-8 shadow-xl border-2 border-stone-600 w-10 h-10 bg-stone-800 rounded-full absolute right-5 lg:right-8 z-40 cursor-pointer"
                      >
                        <DeleteRoundedIcon />
                      </button>
                    )}
                    <div className="relative z-0">
                      <BlogCard
                        title={blog.title}
                        author={blog.author}
                        image={`http://localhost:8000/images/${blog.image}`}
                        blog={blog}
                        content={blog.content}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {/* <div>
              
              {bookmarkedBlogs.length > 0 ? (
                bookmarkedBlogs.map((blog) => (
                  <div key={blog._id}>
                    <h2>{blog.title}</h2>
                    <p>{blog.content}</p>
                  </div>
                ))
              ) : (
                <p>You have no bookmarked blogs.</p>
              )}
            </div> */}
            <h1 className="text-2xl font-bold mb-3 mt-10 font-subtitle text-stone-400 ">
              Your Bookmarked Blogs
            </h1>

            <div>
              {results.length > 0 ? (
                results.map((blog) => (
                  <li>
                    <button
                      onClick={() => removeBookmark(blog._id)}
                      className="text-white mt-8 shadow-xl border-2 border-stone-600 w-10 h-10 bg-stone-800 rounded-full absolute right-5 lg:right-8 z-40 cursor-pointer"
                    >
                      <HiOutlineBookmarkSlash />
                    </button>
                    <BlogCard
                      key={blog._id}
                      title={blog.title}
                      author={blog.author}
                      image={`http://localhost:8000/images/${blog.image}`}
                      blog={blog} // Pass the full blog object to BlogCard
                    />
                  </li>
                ))
              ) : (
                <p className="text-white">No results found</p>
              )}
            </div>
          </div>
          <div className="w-[400px] border border-stone-600 p-4">
            <p className="mt-28 mb-10 text-white font-title text-2xl">
              Profile Action Centre
            </p>
            <p className="text-stone-600 cursor-pointer font-subtitle font-semibold">
              Change Profile name
            </p>

            {isLoggedIn ? (
              // If user is logged in, display "Logout" link
              <>
                <p
                  className="text-stone-600 cursor-pointer font-subtitle font-semibold"
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
                  <p className="text-white font-semibold cursor-pointer">
                    Login
                  </p>
                </Link>
              </button>
            )}
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-100">
          <div className="bg-stone-900 p-8 max-w-md mx-auto rounded-lg shadow-lg z-101">
            <h2 className="text-xl font-bold mb-4 text-white">Delete Blog</h2>
            <p className="text-white">
              Are you sure you want to delete this blog?
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2 cursor-pointer"
              >
                Delete
              </button>
              <button
                onClick={closeDeleteModal}
                className="bg-stone-600 text-white px-4 py-2 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;

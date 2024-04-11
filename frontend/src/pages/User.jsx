import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import UserPic from "../assets/pexels-eric-w-3375230.jpg";
import BlogCard from "../components/BlogCard";
import axios from "axios";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import toast from "react-hot-toast";

const decodeToken = (token) => {
  const payload = token.split(".")[1];
  return JSON.parse(atob(payload));
};

const User = () => {
  const [username, setUsername] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

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
        // console.log("Response:", response); // Log the response
        // Filter blogs based on author name or ID
        const filteredBlogs = response.data.data.filter((blog) => {
          // Assuming decodedToken contains user information like username and ID
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

    // Fetch data when the component mounts
    fetchData();

    // Decode the JWT token to get user information
    const decodedToken = decodeToken(token);
    setUsername(decodedToken.username);
  }, []); // Empty dependency array ensures that useEffect runs only once when the component mounts

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(
        `http://localhost:8000/${selectedBlog._id}`,
        config
      );
      // console.log(response.data.message);
      toast.success("Blog deleted successfully!");
      // Refresh blogs after deletion
      const updatedBlogs = blogs.filter(
        (blog) => blog._id !== selectedBlog._id
      );
      setBlogs(updatedBlogs);
      setShowDeleteModal(false);
    } catch (error) {
      // console.log("Axios Error:", error);
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

  return (
    <div>
      <Navbar />
      <div className="bg-gray-300  h-32 w-11/12 ml-14 m-5">
        <div className="top-28 left-10">
          <div className="flex items-center justify-center gap-8">
            {/* <img
              src={UserPic}
              alt=""
              className="h-32 w-32 rounded-full border border-gray-400 bg-contain cursor-pointer"
            /> */}
            <h1 className="text-4xl font-bold font-title text-stone-700 mt-36">
              {username}
            </h1>
          </div>
        </div>
      </div>
      <div className="mt-5 ml-14">
        <h2 className="text-2xl font-bold mb-3 mt-28 font-subtitle text-stone-400">
          Your Blogs
        </h2>
        {loading ? (
          <p>Loading...</p>
        ) : blogs.length === 0 ? (
          <p className="text-xl font-bold  font-subtitle text-stone-700">
            No published blogs
          </p>
        ) : (
          <ul>
            {blogs.map((blog, index) => (
              <li key={index} className="mb-4">
                {blog.author === username && (
                  <button
                    onClick={() => openDeleteModal(blog)}
                    className="text-stone-600 mt-2 absolute right-8 z-30 "
                  >
                    <DeleteRoundedIcon />
                  </button>
                )}
                <div className="relative">
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
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 max-w-md mx-auto rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Delete Blog</h2>
            <p>Are you sure you want to delete this blog?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Delete
              </button>
              <button
                onClick={closeDeleteModal}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
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

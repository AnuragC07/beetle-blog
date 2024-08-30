import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
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
        const response = await axios.get(
          "https://beetle-backend.onrender.com/",
          config
        );
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
      await axios.delete(
        `https://beetle-backend.onrender.com/${selectedBlog._id}`,
        config
      );
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

  return (
    <div>
      <Navbar />
      <div className="bg-gray-300 h-32 w-11/12 lg:ml-14 m-5">
        <div className="top-28 left-10">
          <div className="flex items-center justify-center gap-8">
            <h1 className="text-3xl lg:text-4xl font-bold font-subtitle text-stone-700 mt-36">
              {username}
            </h1>
          </div>
        </div>
      </div>
      <div className="mt-5 ml-2 mr-2 lg:ml-14">
        <h2 className="text-2xl font-bold mb-3 mt-28 font-subtitle text-stone-400">
          Your Blogs
        </h2>
        {loading ? (
          <p>Loading...</p>
        ) : blogs.length === 0 ? (
          <p className="text-xl font-bold font-subtitle text-stone-700">
            No published blogs
          </p>
        ) : (
          <ul className="mt-16 relative">
            {blogs.map((blog, index) => (
              <li key={index} className="mb-4">
                {blog.author === username && (
                  <button
                    onClick={() => openDeleteModal(blog)}
                    className="text-red-800 mt-8 shadow-xl border-2 border-stone-100 w-10 h-10 bg-white rounded-full absolute right-5 lg:right-60 z-40 cursor-pointer"
                  >
                    <DeleteRoundedIcon />
                  </button>
                )}
                <div className="relative z-0">
                  <BlogCard
                    title={blog.title}
                    author={blog.author}
                    image={`https://beetle-backend.onrender.com/images/${blog.image}`}
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
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-100">
          <div className="bg-white p-8 max-w-md mx-auto rounded-lg shadow-lg z-101">
            <h2 className="text-xl font-bold mb-4">Delete Blog</h2>
            <p>Are you sure you want to delete this blog?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2 cursor-pointer"
              >
                Delete
              </button>
              <button
                onClick={closeDeleteModal}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg cursor-pointer"
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

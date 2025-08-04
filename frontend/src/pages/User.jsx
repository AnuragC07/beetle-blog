import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import DisplayCard from "../components/DisplayCard";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
const decodeToken = (token) => {
  const payload = token.split(".")[1];
  return JSON.parse(atob(payload));
};

const categories = [
  "Environment",
  "Gaming",
  "Technology",
  "Programming",
  "AI",
  "Politics",
  "Wildlife",
];

const User = () => {
  const [columns, setColumns] = useState([]);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState([]);
  const [followedTopics, setFollowedTopics] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decoded = decodeToken(token);
      setUsername(decoded.username);
      setUserId(decoded.id);
      // Fetch user's blogs
      axios.get("http://localhost:8000/").then((response) => {
        const userBlogs = response.data.data.filter(
          (blog) => blog.authorId === decoded.id
        );
        setBlogs(userBlogs);
      });
      // Fetch user's columns
      axios
        .get(`http://localhost:8000/columns/by-user/${decoded.id}`)
        .then((res) => {
          setColumns(res.data.columns);
        });
      // Fetch user's bookmarked blogs
      axios
        .get("http://localhost:8000/api/bookmarks", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setBookmarkedBlogs(res.data.bookmarkedBlogs || []);
        });
      // Fetch user's followed topics
      axios
        .get("http://localhost:8000/user/followed-topics", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setFollowedTopics(res.data.followedTopics || []);
        });
    }
  }, []);

  return (
    <div className="bg-black min-h-screen pb-7 pt-7">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4">
        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-amber-100 font-title text-center">
            {username}
          </h2>
          <div className="mb-12">
            <div className="flex justify-between">
              <h3 className="text-lg md:text-xl font-title text-white mb-6">
                Your Columns
              </h3>
              <Link
                to="/createcolumn"
                className="flex justify-between gap-2 px-4 py-2 rounded-3xl shadow-md w-fit border-2 border-stone-800 bg-black mb-4"
              >
                <AddCircleOutlineOutlinedIcon className=" text-stone-300  rounded-full " />
                <p className="text-stone-300 cursor-pointer font-subtitle">
                  Create a Column
                </p>
              </Link>
            </div>
            <div className="space-y-4">
              {columns.length === 0 ? (
                <p className="text-stone-500 text-center">
                  No columns created yet.
                </p>
              ) : (
                columns.map((col) => (
                  <Link
                    key={col._id}
                    to={`/usercolumns/${col._id}`}
                    className="bg-stone-950 p-4 md:p-6 block shadow-md shadow-stone-900 rounded-xl hover:bg-stone-900 transition"
                  >
                    <h3 className="text-lg md:text-xl font-semibold font-title text-amber-100 mb-2">
                      {col.name}
                    </h3>
                    <p className="text-stone-500 text-sm md:text-base">
                      {col.description}
                    </p>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Your Blogs */}
          <div className="mb-12">
            <h3 className="text-lg md:text-xl font-title text-white mb-6">
              Your Blogs
            </h3>
            <div className="space-y-4">
              {blogs.length === 0 ? (
                <p className="text-stone-500 text-center">
                  No blogs created yet.
                </p>
              ) : (
                blogs.map((blog) => (
                  <DisplayCard
                    key={blog._id}
                    title={blog.title}
                    author={blog.author}
                    category={blog.category}
                    textblog={blog}
                    image={
                      blog.image
                        ? `http://localhost:8000/images/${blog.image}`
                        : undefined
                    }
                  />
                ))
              )}
            </div>
          </div>

          {/* Your Bookmarked Blogs */}
          <div className="mb-12">
            <h3 className="text-lg md:text-xl font-title text-white mb-6">
              Your Bookmarked Blogs
            </h3>
            <div className="space-y-4">
              {bookmarkedBlogs.length === 0 ? (
                <p className="text-stone-500 text-center">
                  No bookmarked blogs.
                </p>
              ) : (
                bookmarkedBlogs.map((blog) => (
                  <DisplayCard
                    key={blog._id}
                    title={blog.title}
                    author={blog.author}
                    category={blog.category}
                    textblog={blog}
                    image={
                      blog.image
                        ? `http://localhost:8000/images/${blog.image}`
                        : undefined
                    }
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;

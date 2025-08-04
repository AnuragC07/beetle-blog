import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import DisplayCard from "../components/DisplayCard";

const decodeToken = (token) => {
  const payload = token.split(".")[1];
  return JSON.parse(atob(payload));
};

const categories = [
  "Entertainment",
  "Gaming",
  "Technology",
  "Programming",
  "AI",
  "Movies",
  "Politics",
  "Sports",
];

const User = () => {
  const [columns, setColumns] = useState([]);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState([]);
  const [followedTopics, setFollowedTopics] = useState([]);
  const [textblogs, setTextBlogs] = useState([]);
  const [showAllTopStories, setShowAllTopStories] = useState(false);
  const [showAllLatest, setShowAllLatest] = useState(false);

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
        setTextBlogs(response.data.data);
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
    // Fetch blogs for rightbar
    axios.get("http://localhost:8000/").then((response) => {
      setTextBlogs(response.data.data);
    });
  }, []);

  // Rightbar logic (copied from Home.jsx)
  const visibleCategories = categories;
  const blogsByCategory = categories.reduce((acc, category) => {
    acc[category] = textblogs.filter((blog) => blog.category === category);
    return acc;
  }, {});
  const topStories = textblogs
    .slice()
    .sort((a, b) => (b.comments?.length || 0) - (a.comments?.length || 0));
  const visibleTopStories = showAllTopStories
    ? topStories
    : topStories.slice(0, 5);
  const visibleLatestArticles = showAllLatest
    ? textblogs.slice().reverse()
    : textblogs.slice().reverse().slice(0, 5);

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="flex flex-row w-full">
        {/* Main content */}
        <div className="flex-1 flex flex-col items-center p-8">
          <h2 className="text-2xl font-semibold mb-6 text-amber-100 font-title mt-12">
            {username}
          </h2>
          {/* Your Blogs */}
          <h3 className="text-lg font-title text-white mb-4 mt-10">
            Your Blogs
          </h3>
          <div className="w-full max-w-2xl mt-8 flex flex-col gap-6 mb-8">
            {blogs.length === 0 ? (
              <p className="text-white">No blogs created yet.</p>
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

          {/* Your Bookmarked Blogs */}
          <h3 className="text-lg font-title text-white mb-4">
            Your Bookmarked Blogs
          </h3>
          <div className="w-full max-w-2xl flex flex-col gap-6 mb-8 mt-10">
            {bookmarkedBlogs.length === 0 ? (
              <p className="text-white">No bookmarked blogs.</p>
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

          {/* Your Followed Topics */}
          {/* <h3 className="text-xl font-semibold text-white mb-4">
            Your Followed Topics
          </h3>
          <div className="w-full max-w-2xl flex flex-row flex-wrap gap-2 mb-8">
            {followedTopics.length === 0 ? (
              <p className="text-white">No followed topics.</p>
            ) : (
              followedTopics.map((topic, idx) => (
                <span
                  key={idx}
                  className="px-4 py-1 border border-amber-100 bg-black text-amber-100 font-bit rounded-2xl text-sm"
                >
                  #{topic}
                </span>
              ))
            )}
          </div> */}

          {/* Your Columns (non-destructive) */}
          <h3 className="text-lg font-title text-white mb-4">Your Columns</h3>
          <div className="w-full max-w-2xl flex flex-col gap-6 mt-10">
            {columns.length === 0 ? (
              <p className="text-white">No columns created yet.</p>
            ) : (
              columns.map((col) => (
                <Link
                  key={col._id}
                  to={`/usercolumns/${col._id}`}
                  className="bg-stone-950 p-4 block shadow-md shadow-stone-900 rounded-xl hover:bg-stone-900 transition"
                >
                  <h3 className="text-lg font-semibold font-title text-amber-100">
                    {col.name}
                  </h3>
                  <p className="text-stone-500 mb-2">{col.description}</p>
                </Link>
              ))
            )}
          </div>
        </div>
        {/* Rightbar (copied from Home.jsx) */}
        <div className="w-2/5 border border-stone-700 text-white  hidden md:block">
          {/* Topics to follow section */}
          <div className="flex flex-col pt-10 items-center">
            <h1 className="mb-4 text-white font-title text-2xl mt-12">
              Topics to follow
            </h1>
            <div className="flex flex-row flex-wrap gap-2 justify-center mb-2 w-full px-4">
              {visibleCategories.map((category) => (
                <span
                  key={category}
                  className="cursor-pointer px-4 py-1 mb-2 border border-stone-800 bg-black hover:bg-stone-800 text-amber-100 font-bit rounded-2xl text-sm transition-colors duration-300"
                >
                  #{category}
                </span>
              ))}
            </div>
          </div>
          {/* Top Stories Section in Sidebar */}
          <div className="flex flex-col pt-4 items-center">
            <h1 className="mt-2 mb-8 text-white font-title text-2xl">
              Top Stories
            </h1>
            {visibleTopStories.map((blog, idx) => (
              <DisplayCard
                key={blog._id || blog.title || idx}
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
            ))}
            {topStories.length > 5 && !showAllTopStories && (
              <div className="flex justify-center w-full">
                <button
                  className="mt-4 px-4 py-2 bg-stone-800 text-white rounded-xl hover:bg-stone-700 transition-colors"
                  onClick={() => setShowAllTopStories(true)}
                >
                  Explore More
                </button>
              </div>
            )}
            {showAllTopStories && (
              <div className="flex justify-center w-full">
                <button
                  className="mt-4 px-4 py-2 bg-stone-800 text-white rounded-xl hover:bg-stone-700 transition-colors"
                  onClick={() => setShowAllTopStories(false)}
                >
                  Show Less
                </button>
              </div>
            )}
          </div>
          {/* Latest Articles Section in Sidebar */}
          <div className="flex justify-center items-center">
            <p className="mt-10 mb-8 text-white font-title text-2xl">
              Latest Articles
            </p>
          </div>
          <div className="mt-0 flex flex-col items-center">
            {visibleLatestArticles.map((textblog, index) => (
              <DisplayCard
                key={index}
                title={textblog.title}
                author={textblog.author}
                category={textblog.category}
                textblog={textblog}
              />
            ))}
            {textblogs.length > 5 && !showAllLatest && (
              <div className="flex justify-center w-full">
                <button
                  className="mt-4 px-4 py-2 bg-stone-800 text-white rounded-xl hover:bg-stone-700 transition-colors"
                  onClick={() => setShowAllLatest(true)}
                >
                  Explore More
                </button>
              </div>
            )}
            {showAllLatest && (
              <div className="flex justify-center w-full">
                <button
                  className="mt-4 px-4 py-2 bg-stone-800 text-white rounded-xl hover:bg-stone-700 transition-colors"
                  onClick={() => setShowAllLatest(false)}
                >
                  Show Less
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;

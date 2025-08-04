import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DisplayCard from "../components/DisplayCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Gaming = () => {
  const [blogs, setBlogs] = useState([]); // all blogs
  const [gamingBlogs, setGamingBlogs] = useState([]); // only gaming
  const [filter, setFilter] = useState("top"); // 'top' or 'latest'
  const [followers, setFollowers] = useState(123); // Placeholder
  const [isFollowing, setIsFollowing] = useState(false); // Placeholder
  const [showAllTopStories, setShowAllTopStories] = useState(false);
  const [showAllLatest, setShowAllLatest] = useState(false);
  const [showAllSidebarTopStories, setShowAllSidebarTopStories] =
    useState(false);
  const [showAllSidebarLatest, setShowAllSidebarLatest] = useState(false);

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

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get("http://localhost:8000/", config)
      .then((response) => {
        setBlogs(response.data.data);
        setGamingBlogs(
          response.data.data.filter((b) => b.category === "Gaming")
        );
      })
      .catch(() => {});
  }, []);

  const getTopStories = (blogs, count = 5) => {
    return blogs
      .slice()
      .sort((a, b) => (b.comments?.length || 0) - (a.comments?.length || 0))
      .slice(0, count);
  };
  const getLatestStories = (blogs, count = 5) => {
    return blogs
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, count);
  };

  // For main section (only gaming)
  const topStories = getTopStories(
    gamingBlogs,
    showAllTopStories ? gamingBlogs.length : 5
  );
  const latestStories = getLatestStories(
    gamingBlogs,
    showAllLatest ? gamingBlogs.length : 5
  );
  const posts = filter === "top" ? topStories : latestStories;
  // For sidebar (all blogs)
  const sidebarTopStories = getTopStories(blogs, 4);
  const sidebarLatestArticles = blogs.slice().reverse();

  const visibleSidebarTopStories = showAllSidebarTopStories
    ? sidebarTopStories
    : sidebarTopStories.slice(0, 5);
  const visibleSidebarLatestArticles = showAllSidebarLatest
    ? sidebarLatestArticles
    : sidebarLatestArticles.slice(0, 5);

  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <section className="flex gap-2 bg-black">
        {/* Main content */}
        <div className="flex justify-center mt-1 bg-black w-11/12 min-h-screen">
          <div className="m-1 mt-12 flex flex-col w-full lg:w-4/5 bg-black min-h-screen">
            <div className="flex justify-between items-center mb-2 mt-12">
              <h1 className="text-4xl font-bit text-white">#Gaming</h1>
              <button
                className={`px-6 py-2 rounded-2xl font-subtitle text-lg border-2 transition-colors ${
                  isFollowing
                    ? "bg-stone-800 text-white border-stone-700"
                    : "bg-black text-amber-100 border-amber-100"
                }`}
                onClick={() => setIsFollowing((f) => !f)}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            </div>
            <div className="text-stone-400 font-subtitle mb-2">
              {followers} followers
            </div>
            <hr className="border-stone-700 mb-2" />
            <div className="flex gap-4 mb-2">
              <button
                className={`px-4 py-2 rounded-xl font-title text-base transition-colors ${
                  filter === "top"
                    ? "bg-black text-amber-100"
                    : "bg-black text-stone-600"
                }`}
                onClick={() => setFilter("top")}
              >
                Top Stories
              </button>
              <button
                className={`px-4 py-2 rounded-xl font-title text-base  transition-colors ${
                  filter === "latest"
                    ? "bg-black text-amber-100 "
                    : "bg-black text-stone-600 "
                }`}
                onClick={() => setFilter("latest")}
              >
                Latest Stories
              </button>
            </div>
            <hr className="border-stone-700 mb-6" />
            <div className="space-y-4">
              {posts.length > 0 ? (
                posts.map((blog, idx) => (
                  <DisplayCard
                    key={blog._id || idx}
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
              ) : (
                <p className="text-red-500">No posts available</p>
              )}
              {filter === "top" &&
                gamingBlogs.length > 5 &&
                !showAllTopStories && (
                  <button
                    className="mt-4 px-4 py-2 bg-stone-800 text-white rounded-xl hover:bg-stone-700 transition-colors"
                    onClick={() => setShowAllTopStories(true)}
                  >
                    Explore More
                  </button>
                )}
              {filter === "top" && showAllTopStories && (
                <button
                  className="mt-4 px-4 py-2 bg-stone-800 text-white rounded-xl hover:bg-stone-700 transition-colors"
                  onClick={() => setShowAllTopStories(false)}
                >
                  Show Less
                </button>
              )}
              {filter === "latest" &&
                gamingBlogs.length > 5 &&
                !showAllLatest && (
                  <button
                    className="mt-4 px-4 py-2 bg-stone-800 text-white rounded-xl hover:bg-stone-700 transition-colors"
                    onClick={() => setShowAllLatest(true)}
                  >
                    Explore More
                  </button>
                )}
              {filter === "latest" && showAllLatest && (
                <button
                  className="mt-4 px-4 py-2 bg-stone-800 text-white rounded-xl hover:bg-stone-700 transition-colors"
                  onClick={() => setShowAllLatest(false)}
                >
                  Show Less
                </button>
              )}
            </div>
          </div>
        </div>
        {/* Sidebar (match Home.jsx) */}
        <div className="w-2/5 border border-stone-700 text-white">
          {/* Topics to follow section */}
          <div className="flex flex-col pt-10 items-center">
            <h1 className="mb-4 text-white font-title text-2xl">
              Topics to follow
            </h1>
            <div className="flex flex-row flex-wrap gap-2 justify-center mb-2 w-full px-4">
              {categories.map((category) => (
                <span
                  key={category}
                  onClick={() =>
                    navigate(`/category/${category.toLowerCase()}`)
                  }
                  className="cursor-pointer px-4 py-1 mb-2 border border-stone-800 bg-black hover:bg-stone-800 text-amber-100 font-bit rounded-2xl text-sm transition-colors duration-300"
                >
                  #{category}
                </span>
              ))}
            </div>
          </div>
          {/* Top Stories Section in Sidebar */}
          <div className="flex flex-col pt-10 items-center">
            <h1 className="mt-10 mb-8 text-white font-title text-2xl">
              Top Stories
            </h1>
            {visibleSidebarTopStories.map((blog, idx) => (
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
            {sidebarTopStories.length > 5 && !showAllSidebarTopStories && (
              <div className="flex justify-center w-full">
                <button
                  className="mt-4 px-4 py-2 bg-stone-800 text-white rounded-xl hover:bg-stone-700 transition-colors"
                  onClick={() => setShowAllSidebarTopStories(true)}
                >
                  Explore More
                </button>
              </div>
            )}
            {showAllSidebarTopStories && (
              <div className="flex justify-center w-full">
                <button
                  className="mt-4 px-4 py-2 bg-stone-800 text-white rounded-xl hover:bg-stone-700 transition-colors"
                  onClick={() => setShowAllSidebarTopStories(false)}
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
          <div className="mt-0">
            {visibleSidebarLatestArticles.map((textblog, index) => (
              <DisplayCard
                key={index}
                title={textblog.title}
                author={textblog.author}
                category={textblog.category}
                textblog={textblog}
                // image={
                //   textblog.image
                //     ? `http://localhost:8000/images/${textblog.image}`
                //     : undefined
                // }
              />
            ))}
            {sidebarLatestArticles.length > 5 && !showAllSidebarLatest && (
              <div className="flex justify-center w-full">
                <button
                  className="mt-4 px-4 py-2 bg-stone-800 text-white rounded-xl hover:bg-stone-700 transition-colors"
                  onClick={() => setShowAllSidebarLatest(true)}
                >
                  Explore More
                </button>
              </div>
            )}
            {showAllSidebarLatest && (
              <div className="flex justify-center w-full">
                <button
                  className="mt-4 px-4 py-2 bg-stone-800 text-white rounded-xl hover:bg-stone-700 transition-colors"
                  onClick={() => setShowAllSidebarLatest(false)}
                >
                  Show Less
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gaming;

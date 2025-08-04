import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import DisplayCard from "../components/DisplayCard";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
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

const UserColumns = () => {
  const { columnId } = useParams();
  const [column, setColumn] = useState(null);
  const [user, setUser] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [textblogs, setTextBlogs] = useState([]);
  const [showAllTopStories, setShowAllTopStories] = useState(false);
  const [showAllLatest, setShowAllLatest] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/column/${columnId}`)
      .then((res) => {
        setColumn(res.data.column);
        setUser(res.data.user);
        setNotFound(false);
      })
      .catch(() => {
        setNotFound(true);
      });
    // Fetch blogs for rightbar
    axios.get("http://localhost:8000/").then((response) => {
      setBlogs(response.data.data);
      setTextBlogs(response.data.data);
    });
  }, [columnId]);

  // Rightbar logic (copied from Home.jsx/TopicPage.jsx)
  const visibleCategories = categories;
  const blogsByCategory = categories.reduce((acc, category) => {
    acc[category] = blogs.filter((blog) => blog.category === category);
    return acc;
  }, {});
  const topStories = blogs
    .slice()
    .sort((a, b) => (b.comments?.length || 0) - (a.comments?.length || 0));
  const visibleTopStories = showAllTopStories
    ? topStories
    : topStories.slice(0, 5);
  const visibleLatestArticles = showAllLatest
    ? textblogs.slice().reverse()
    : textblogs.slice().reverse().slice(0, 5);

  if (notFound) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center p-8">
        <Navbar />
        <h2 className="text-2xl font-bold mb-6">Column Not Found</h2>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="flex flex-row w-full">
        {/* Main content */}
        <div className="flex-1 flex flex-col items-center p-8">
          {column ? (
            <div className="w-full max-w-2xl mt-16">
              <div className="flex gap-4 items-center">
                <ArticleOutlinedIcon
                  style={{ color: "#fff", fontSize: 36 }}
                  className="mb-1"
                />
                <h1 className="text-4xl font-title text-stone-200 font-bold mb-4">
                  {column.name}.
                </h1>
              </div>
              {/* <hr className="border-stone-700 mb-6" /> */}
              <div className="bg-stone-900 p-6 rounded-lg shadow mb-6">
                <p className="text-stone-300 text-lg font-subtitle mb-2">
                  {column.description}
                </p>
                {user && (
                  <div className="mt-8 text-stone-400 text-right">
                    <span className="font-subtitle">a column by </span>
                    <span className="font-bold">{user.username}</span>
                  </div>
                )}
              </div>
              <hr className="border-stone-700 mb-6" />
            </div>
          ) : (
            <h2 className="text-2xl font-bold mb-6">Loading...</h2>
          )}
        </div>
        {/* Rightbar (copied from Home.jsx/TopicPage.jsx) */}
        <div className="w-2/5 border border-stone-700 text-white">
          {/* Topics to follow section */}
          <div className="flex flex-col pt-10 items-center">
            <h1 className="mb-4 text-white font-title text-2xl mt-12">
              Topics to follow
            </h1>
            <div className="flex flex-row flex-wrap gap-2 justify-center mb-2 w-full px-4">
              {visibleCategories.map((category) => (
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
          <div className="mt-0">
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

export default UserColumns;

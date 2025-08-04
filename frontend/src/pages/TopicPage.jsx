import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DisplayCard from "../components/DisplayCard";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const categories = [
  "Environment",
  "Gaming",
  "Technology",
  "Programming",
  "AI",
  "Politics",
  "Wildlife",
];

const TopicPage = () => {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]); // all blogs
  const [topicBlogs, setTopicBlogs] = useState([]); // only for this topic
  const [filter, setFilter] = useState("top"); // 'top' or 'latest'
  const [followers, setFollowers] = useState(0); // Dynamic
  const [isFollowing, setIsFollowing] = useState(false); // Dynamic
  const [showAllTopStories, setShowAllTopStories] = useState(false);
  const [showAllLatest, setShowAllLatest] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem("jwtToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        // Blogs
        const blogsRes = await axios.get("http://localhost:8000/", config);
        setBlogs(blogsRes.data.data);
        setTopicBlogs(
          blogsRes.data.data.filter(
            (b) =>
              b.category && b.category.toLowerCase() === topic.toLowerCase()
          )
        );
        // Topics
        const topicsRes = await axios.get(
          "http://localhost:8000/topics",
          config
        );
        const found = topicsRes.data.topics.find(
          (t) => t.name.toLowerCase() === topic.toLowerCase()
        );
        setFollowers(found ? found.followers : 0);
        // User followed topics
        const userTopicsRes = await axios.get(
          "http://localhost:8000/user/followed-topics",
          config
        );
        setIsFollowing(
          userTopicsRes.data.followedTopics
            .map((t) => t.toLowerCase())
            .includes(topic.toLowerCase())
        );
      } catch (e) {
        // fallback
        setFollowers(0);
        setIsFollowing(false);
      }
      setLoading(false);
    };
    fetchData();
  }, [topic]);

  const handleFollow = async () => {
    const token = localStorage.getItem("jwtToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    if (!isFollowing) {
      await axios.post(
        "http://localhost:8000/follow-topic",
        { topicName: topic },
        config
      );
    } else {
      await axios.post(
        "http://localhost:8000/unfollow-topic",
        { topicName: topic },
        config
      );
    }
    // Refetch follow state and count
    const topicsRes = await axios.get("http://localhost:8000/topics", config);
    const found = topicsRes.data.topics.find(
      (t) => t.name.toLowerCase() === topic.toLowerCase()
    );
    setFollowers(found ? found.followers : 0);
    const userTopicsRes = await axios.get(
      "http://localhost:8000/user/followed-topics",
      config
    );
    setIsFollowing(
      userTopicsRes.data.followedTopics
        .map((t) => t.toLowerCase())
        .includes(topic.toLowerCase())
    );
  };

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

  // For main section (only this topic)
  const topStories = getTopStories(
    topicBlogs,
    showAllTopStories ? topicBlogs.length : 5
  );
  const latestStories = getLatestStories(
    topicBlogs,
    showAllLatest ? topicBlogs.length : 5
  );
  const posts = filter === "top" ? topStories : latestStories;

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4">
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bit text-white">
              #{topic}
            </h1>
          </div>
          <hr className="border-stone-700 mb-6" />
          <div className="flex gap-4 mb-6">
            <button
              className={`px-3 py-2 md:px-4 md:py-2 rounded-xl font-subtitle text-sm md:text-base transition-colors ${
                filter === "top"
                  ? "bg-black text-amber-100"
                  : "bg-black text-stone-600"
              }`}
              onClick={() => setFilter("top")}
            >
              Top Stories
            </button>
            <button
              className={`px-3 py-2 md:px-4 md:py-2 rounded-xl font-subtitle text-sm md:text-base transition-colors ${
                filter === "latest"
                  ? "bg-black text-amber-100"
                  : "bg-black text-stone-600"
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
              <p className="text-stone-500 text-center">No posts available</p>
            )}
            {filter === "top" &&
              topicBlogs.length > 5 &&
              !showAllTopStories && (
                <div className="flex justify-center">
                  <button
                    className="mt-4 px-4 py-2 bg-stone-800 text-white rounded-xl hover:bg-stone-700 transition-colors"
                    onClick={() => setShowAllTopStories(true)}
                  >
                    Explore More
                  </button>
                </div>
              )}
            {filter === "top" && showAllTopStories && (
              <div className="flex justify-center">
                <button
                  className="mt-4 px-4 py-2 bg-stone-800 text-white rounded-xl hover:bg-stone-700 transition-colors"
                  onClick={() => setShowAllTopStories(false)}
                >
                  Show Less
                </button>
              </div>
            )}
            {filter === "latest" && topicBlogs.length > 5 && !showAllLatest && (
              <div className="flex justify-center">
                <button
                  className="mt-4 px-4 py-2 bg-stone-800 text-white rounded-xl hover:bg-stone-700 transition-colors"
                  onClick={() => setShowAllLatest(true)}
                >
                  Explore More
                </button>
              </div>
            )}
            {filter === "latest" && showAllLatest && (
              <div className="flex justify-center">
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

export default TopicPage;

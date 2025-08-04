import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import PropTypes from "prop-types";
import { GoCommentDiscussion } from "react-icons/go";
import { AiOutlineLike } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import DisplayCard from "../components/DisplayCard";

const FullBlog = () => {
  const [blog, setBlog] = useState({});
  const [textblogs, setTextBlogs] = useState([]);
  const { id } = useParams();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalcomments, setTotalComments] = useState(0);

  const decodeToken = (token) => {
    try {
      const payload = token.split(".")[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  useEffect(() => {
    setLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    const token = localStorage.getItem("jwtToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`http://localhost:8000/${id}`, config)
      .then((response) => {
        setBlog(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });

    axios
      .get("http://localhost:8000/", config)
      .then((response) => {
        setTextBlogs(response.data.data);
      })
      .catch(() => {
        // console.log("Axios Error:", error);
      });
    fetchComments();
  }, [id]);

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get(`http://localhost:8000/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setTotalComments(response.data.comments.length);
      setComments(response.data.comments || []);
    } catch (err) {
      console.error("Error details:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Error fetching comments");
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("jwtToken");
      const decodedToken = decodeToken(token);

      if (!decodedToken || !decodedToken.id) {
        throw new Error("Invalid token or missing user ID");
      }

      const response = await axios.post(
        `http://localhost:8000/comments/${id}`,
        {
          content: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setNewComment("");
      await fetchComments();
      setLoading(false);
    } catch (error) {
      console.error("Error posting comment:", error);
      setError(error.response?.data?.error || "Error posting comment");
      setLoading(false);
    }
  };

  const bookmarkBlog = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.post(
        `http://localhost:8000/bookmark/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Handle bookmark response
    } catch (error) {
      console.error("Error bookmarking blog:", error);
    }
  };

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    return `${date.toLocaleDateString()} `;
  };

  // Helper: get latest articles
  const getLatestArticles = (blogs, count = 5) => {
    return blogs
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, count);
  };

  const latestArticles = getLatestArticles(textblogs, 5);

  const navigate = useNavigate();

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      {loading ? (
        <div className="flex justify-center items-center min-h-screen bg-black">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-400"></div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-4">
          <div className="mt-16">
            <div className="text-left items-start border-b border-b-stone-700 pb-6">
              <p className="font-bit mb-4 text-amber-100 border w-fit rounded-2xl px-4 py-2 border-stone-800">
                {blog.category}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold font-title text-amber-50 mb-4">
                {blog.title}
              </h1>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4 text-stone-400">
                  <p className="font-subtitle font-semibold">
                    by {blog.author}
                  </p>
                  <p className="font-subtitle font-semibold">
                    {formatCreatedAt(blog.createdAt)}
                  </p>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="bg-black h-10 rounded-full py-2 px-4 flex gap-2 items-center text-stone-400">
                    <GoCommentDiscussion size={20} />
                    <p>{totalcomments}</p>
                  </div>
                  <div className="bg-black rounded-full py-2 px-4 flex gap-2 items-center hover:bg-stone-700 transition-colors duration-300 text-stone-400 cursor-pointer">
                    <button onClick={() => bookmarkBlog()}>
                      <BsBookmark />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Only show image if blog.image exists and is not empty */}
            {blog.image && (
              <img
                src={`http://localhost:8000/images/${blog.image}`}
                alt=""
                className="w-full rounded-2xl mt-8 object-cover"
              />
            )}

            <div
              className="font-title text-stone-200 font-medium text-xl mt-8 leading-9 ql-editor"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            ></div>

            {/* Comments Section */}
            <div className="pt-12 mt-12 border-t-2 border-t-stone-700">
              <h3 className="text-3xl font-title mb-6 text-stone-100">
                {totalcomments} Comments
              </h3>

              {/* Comment Form */}
              <form onSubmit={handleSubmitComment} className="mb-8">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-4 border border-stone-700 rounded-xl text-stone-100 mb-4 bg-black placeholder:text-stone-500 font-subtitle"
                  placeholder="Write a comment..."
                  rows="3"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-stone-800 text-white rounded-xl hover:bg-stone-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? "Posting..." : "Post Comment"}
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
              </form>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="p-4 bg-stone-900 rounded-xl"
                  >
                    <div className="flex flex-col">
                      <p className="text-lg text-stone-100 mb-2">
                        {comment.content}
                      </p>
                      <div className="flex gap-4 items-center">
                        <span className="text-stone-500 text-sm font-subtitle">
                          {comment.author.username}
                        </span>
                        <span className="text-stone-500 text-sm font-subtitle">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest Articles */}
            <div className="pt-12 mt-12 border-t-2 border-t-stone-700">
              <h3 className="text-3xl font-title mb-6 text-stone-100">
                Latest Articles
              </h3>
              <div className="space-y-4">
                {latestArticles.length > 0 ? (
                  latestArticles
                    .filter((textblog) => textblog.image) // Only show articles with images
                    .map((textblog, index) => (
                      <DisplayCard
                        key={textblog._id || index}
                        title={textblog.title}
                        author={textblog.author}
                        category={textblog.category}
                        textblog={textblog}
                        image={`http://localhost:8000/images/${textblog.image}`}
                      />
                    ))
                ) : (
                  <p className="text-stone-500">No articles available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FullBlog;

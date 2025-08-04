import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import PropTypes from "prop-types";
import BlogTextCard from "../components/BlogTextCard";
import { GoCommentDiscussion } from "react-icons/go";
import { AiOutlineLike } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import DisplayCard from "../components/DisplayCard";
import BlogCard from "../components/BlogCard";
// const decodeToken = (token) => {
//   const payload = token.split(".")[1];
//   return JSON.parse(atob(payload));
// };

const FullBlog = () => {
  const [blog, setBlog] = useState({});
  const [textblogs, setTextBlogs] = useState([]);
  const { id } = useParams();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false); // repurpose for page loading
  const [error, setError] = useState(null);
  const [totalcomments, setTotalComments] = useState("");
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
    // Call the function to get username when the component mounts

    const token = localStorage.getItem("jwtToken");
    // console.log("Token:", token);
    // Set the Authorization header in axios request config
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
        // console.log(error);
        setLoading(false);
      });

    axios
      .get("http://localhost:8000/", config)
      .then((response) => {
        setTextBlogs(response.data.data);
        // console.log(response.data.data);
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
      // console.log("Fetched comments:", response.data);
      setTotalComments(response.data.comments.length); // Add this for debugging
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
        "http://localhost:8000/comments",
        {
          blogId: id, // Changed from id to blogId
          content: newComment,
          authorId: decodedToken.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Comment posted:", response.data); // Add this for debugging
      setNewComment("");
      fetchComments();
    } catch (err) {
      console.error("Error details:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Error posting comment");
    } finally {
      setLoading(false);
    }
  };

  const bookmarkBlog = async () => {
    try {
      const token = localStorage.getItem("jwtToken"); // Retrieve JWT from localStorage
      const response = await axios.post(
        "http://localhost:8000/bookmark",
        { id: blog._id },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send JWT in the Authorization header
          },
        }
      );

      console.log("Bookmark added:", response.data.message);
    } catch (error) {
      console.error(
        "Error bookmarking blog:",
        error.response?.data || error.message
      );
    }
  };

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    return `${date.toLocaleDateString()} `;
  };

  // Helper: get top stories (by comments)
  const getTopStories = (blogs, count = 5) => {
    return blogs
      .slice()
      .sort((a, b) => (b.comments?.length || 0) - (a.comments?.length || 0))
      .slice(0, count);
  };
  // Helper: get latest articles (excluding top stories)
  const getLatestArticles = (blogs, skip = 5, count = 5) => {
    return blogs
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(skip, skip + count);
  };
  // State for explore more
  const [showAllTopStories, setShowAllTopStories] = useState(false);
  const [showAllLatest, setShowAllLatest] = useState(false);
  const topStories = getTopStories(
    textblogs,
    showAllTopStories ? textblogs.length : 5
  );
  const latestArticles = getLatestArticles(
    textblogs,
    0,
    showAllLatest ? textblogs.length : 5
  );

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

  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      {loading ? (
        <div className="flex justify-center items-center min-h-screen bg-black">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-400"></div>
        </div>
      ) : (
        <section className="flex gap-2 bg-black">
          <div className="flex justify-center mt-1 bg-black w-11/12">
            <div className="m-1 mt-12 flex flex-col w-full lg:w-4/5 bg-black">
              <div className="text-left items-start pl-2 border-b border-b-stone-700">
                <p className="font-bit mb-2 text-amber-100 mt-4 lg:mt-20 border w-fit rounded-2xl px-4 py-1 border-stone-800">
                  {blog.category}
                </p>
                <h1 className="text-4xl lg:text-5xl font-bold font-title text-amber-50 w-full text-left items-left ">
                  {blog.title}
                </h1>
                <div className="flex justify-between">
                  <p className="text-lg lg:text-xl border-l-4 border-stone-400 text-stone-400 pl-2 cursor-pointer font-subtitle font-semibold flex mt-5 mb-5">
                    by {blog.author}
                    <div className="font-subtitle font-semibold text-xl ml-2">
                      {formatCreatedAt(blog.createdAt)}
                    </div>
                  </p>
                  <div className="flex gap-4 items-center">
                    {/* <div className=" bg-stone-800 h-10 rounded-full px-4 flex gap-2 items-center hover:bg-stone-700 transition-colors duration-300 text-stone-400 cursor-pointer">
                    <AiOutlineLike size={20} />
                    <p>20</p>
                  </div> */}
                    <div className=" bg-black h-10 rounded-full py-2 px-4 flex gap-2 items-center transition-colors duration-300 text-stone-400 cursor-pointer">
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
                  className="max-h-96 min-h-72 w-full rounded-md mt-10"
                />
              )}
              <div
                className="font-title text-stone-200 font-medium h-fit text-xl mt-10 leading-9 ql-editor"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              ></div>
              {/* <div class="w-full bg-stone-900 p-5 text-white border-t border-stone-700 mt-10">
              <h2 class="text-3xl  font-normal mb-3 font-title">Comments</h2>

              <div class="flex gap-2 mb-5">
                <input
                  type="text"
                  placeholder="write a comment"
                  class="w-full p-2 border-b border-stone-600 bg-stone-900 text-stone-200 outline-none placeholder:text-stone-600 font-subtitle"
                />
                <button class="p-2 bg-stone-900 border border-stone-800  hover:bg-stone-800 transition-colors rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
              </div>

              <div class="bg-stone-900 p-4 rounded-lg mb-3 cursor-default">
                <p class="mb-2 font-title text-lg">“It was a fantastic read”</p>
                <div class="text-sm text-stone-400 flex gap-4">
                  <p className="text-stone-500 font-subtitle">Alex</p>
                  <p className="text-stone-500 font-subtitle">2 days ago</p>
                </div>
              </div>

              <div class="bg-stone-900 p-4 rounded-lg cursor-default">
                <p class="mb-2 font-title text-lg">“It was a fantastic read”</p>
                <div class="text-sm text-stone-400 flex gap-4">
                  <p className="text-stone-500 font-subtitle">Alex</p>
                  <p className="text-stone-500 font-subtitle">2 days ago</p>
                </div>
              </div>
            </div> */}

              <div className="pt-12 mt-20 border-t-2 border-t-stone-700 ">
                <h3 className="text-3xl font-title mb-4 text-stone-100">
                  {totalcomments} Comments
                </h3>

                {/* Comment Form */}
                <form onSubmit={handleSubmitComment} className="mb-6">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-2 border border-stone-700 rounded-xl text-stone-100 mb-2 bg-black placeholder:text-stone-500 font-subtitle"
                    placeholder="Write a comment..."
                    rows="3"
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-stone-800 text-white rounded-xl hover:bg-stone-700 disabled:opacity-50 transition-colors delay-75"
                  >
                    {loading ? "Posting..." : "Post Comment"}
                  </button>
                  {error && <p className="text-red-500 mt-2">{error}</p>}
                </form>

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment._id} className="p-4 font-title">
                      <div className="flex flex-col mb-2">
                        <p className="text-xl text-stone-100">
                          {comment.content}
                        </p>
                        <div className="flex gap-4 font-semibold items-center mt-2">
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
              {/* Latest Articles (after comments) */}
              <div className="pt-12 mt-20 border-t-2 border-t-stone-700 ">
                <h3 className="text-3xl font-title mb-4 text-stone-100">
                  Latest Articles
                </h3>
                <div className="space-y-4">
                  {latestArticles.length > 0 ? (
                    latestArticles.map((textblog, index) =>
                      textblog.image ? (
                        <BlogCard
                          key={textblog._id || index}
                          title={textblog.title}
                          author={textblog.author}
                          image={`http://localhost:8000/images/${textblog.image}`}
                          blog={textblog}
                        />
                      ) : (
                        <BlogTextCard
                          key={textblog._id || index}
                          title={textblog.title}
                          author={textblog.author}
                          category={textblog.category}
                          textblog={textblog}
                        />
                      )
                    )
                  ) : (
                    <p className="text-red-500">No articles available</p>
                  )}
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
          <div className="w-2/5 border border-stone-700 text-white hidden md:block">
            {/* Topics to follow section */}
            <div className="flex flex-col pt-10 items-center">
              <h1 className="mb-4 text-white font-title text-2xl mt-12">
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
            <div className="flex flex-col pt-10 items-center">
              <h1 className="mt-10 mb-8 text-white font-title text-2xl">
                Top Stories
              </h1>
              {topStories.length > 0 ? (
                topStories.map((blog, idx) => (
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
                <p className="text-red-500">No top stories available</p>
              )}
              {textblogs.length > 5 && !showAllTopStories && (
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
          </div>
        </section>
      )}
    </div>
  );
};

FullBlog.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default FullBlog;

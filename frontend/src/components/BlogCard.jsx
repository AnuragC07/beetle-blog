import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { GoCommentDiscussion } from "react-icons/go";
import axios from "axios";

const BlogCard = ({ title, author, image, blog }) => {
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    if (blog._id) {
      fetchComments();
    }
  }, [blog._id]);

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const options = { month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get(
        `http://localhost:8000/comments/${blog._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setTotalComments(response.data.comments.length);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  return (
    <Link to={`/fullblog/${blog._id}`}>
      <div className="bg-black rounded-2xl shadow-lg mb-4 overflow-hidden hover:shadow-xl transition-shadow">
        <div className="flex flex-col md:flex-row">
          <img
            src={image}
            alt={title}
            className="w-full md:w-1/3 h-40 md:h-48 object-cover"
          />
          <div className="flex flex-col justify-between p-3 md:p-4 text-white">
            <div>
              <p className="text-amber-100 font-bit text-xs md:text-sm mb-2">
                {blog.category}
              </p>
              <h2 className="text-base md:text-lg lg:text-xl font-bold mb-3 font-subtitle">
                {title}
              </h2>
              <div className="flex items-center gap-2 md:gap-4 text-stone-500 text-xs md:text-sm">
                <p className="font-subtitle">by {author}</p>
                <p className="font-subtitle">
                  {formatCreatedAt(blog.createdAt)}
                </p>
                <div className="flex items-center gap-1">
                  <GoCommentDiscussion size={14} className="md:w-4 md:h-4" />
                  <span>{totalComments}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

BlogCard.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  blog: PropTypes.object.isRequired,
};

export default BlogCard;

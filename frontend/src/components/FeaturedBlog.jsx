import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GoCommentDiscussion } from "react-icons/go";

const formatCreatedAt = (createdAt) => {
  const date = new Date(createdAt);
  const options = { month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

const FeaturedBlog = ({ title, author, image, category, blog }) => {
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    if (blog._id) {
      fetchComments();
    }
  }, [blog._id]);

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
      <div className="bg-black rounded-2xl shadow-lg mb-6 overflow-hidden hover:shadow-xl transition-shadow">
        <div className="flex flex-col md:flex-row">
          <img
            src={image}
            alt={title}
            className="w-full md:w-1/2 h-48 md:h-64 object-cover"
          />
          <div className="flex flex-col gap-4 px-4 md:px-6 text-white">
            <div>
              <p className="text-amber-100 font-bit text-xs md:text-sm mb-2">
                {category}
              </p>
              <h2 className="text-lg md:text-2xl lg:text-3xl font-bold mb-4 font-title text-amber-100">
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
            <div className="mt-4">
              <p
                className="text-stone-400 text-xs md:text-sm font-light line-clamp-3"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedBlog;

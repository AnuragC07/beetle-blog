import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import TrendingFlatRoundedIcon from "@mui/icons-material/TrendingFlatRounded";
import { BsBookmark } from "react-icons/bs";
import { GoCommentDiscussion } from "react-icons/go";
import { AiOutlineLike } from "react-icons/ai";
import axios from "axios";
import { useParams } from "react-router-dom";

const BlogCard = ({ title, author, image, blog }) => {
  const [totalcomments, setTotalComments] = useState("");
  const { id } = useParams();
  // Function to strip HTML tags from content
  // const stripHtmlTags = (htmlContent) => {
  //   return htmlContent.replace(/<[^>]*>?/gm, " ");
  // };

  useEffect(() => {
    fetchComments();
  }, [id]);

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
      // console.log("Fetched comments:", response.data);
      setTotalComments(response.data.comments.length); // Add this for debugging
    } catch (err) {
      console.error("Error details:", err.response?.data || err.message);
    }
  };

  return (
    <div className="flex m-auto justify-center">
      <div className="relative border border-stone-600 rounded-2xl shadow-lg w-full lg:w-full h-52 lg:h-fit flex flex-row gap-5 lg:gap-2 m-0 lg:m-5 lg:ml-14 mt-5 bg-stone-900 overflow-hidden hover:shadow-xl">
        <Link to={`/fullblog/${blog._id}`}>
          <img
            src={image}
            alt="Article cover"
            className="w-72 h-56 object-cover"
          />
        </Link>

        <div className="relative z-10 flex flex-col justify-between h-44 lg:h-56 w-full lg:w-full text-white p-5">
          <div>
            <p className="font-title mb-2 text-amber-100">{blog.category}</p>
            <Link to={`/fullblog/${blog._id}`}>
              <h1 className="max-w-full lg:max-h-24 lg:text-xl text-xl font-subtitle font-semibold lg:font-semimedium overflow-hidden hover:cursor-pointer">
                {title}
              </h1>
            </Link>
            <div className="flex gap-2">
              <p className="text-xs text-stone-500 lg:text-base font-subtitle border-l-4 border-stone-500 pl-2 mt-2 font-bold">
                by {author}
              </p>
              <p className="text-xs text-stone-500 lg:text-base font-subtitle pl-2 mt-2 font-bold">
                {formatCreatedAt(blog.createdAt)}
              </p>
            </div>
            <div className="mt-2">
              <p className="text-stone-400 text-lg font-light">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Voluptates, dolorem.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <div className=" flex gap-2 items-center  text-stone-400 cursor-default">
              <GoCommentDiscussion size={20} />
              <p>{totalcomments}</p>
            </div>
            <div className="bg-stone-800 rounded-full py-2 px-4 flex gap-2 items-center hover:bg-stone-700 transition-colors duration-300 text-stone-400 cursor-pointer">
              <BsBookmark />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BlogCard.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  blog: PropTypes.number.isRequired,
  content: PropTypes.string,
};

export default BlogCard;

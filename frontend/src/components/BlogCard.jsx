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
    <div className="flex m-1 md:m-2 justify-center w-full max-w-full">
      <div className="relative rounded-2xl shadow-lg w-full max-w-full h-fit flex flex-col sm:flex-row gap-2 md:gap-5 lg:gap-2 m-0 md:ml-6 lg:ml-14 mt-2 md:mt-5 bg-black overflow-hidden hover:shadow-xl">
        <Link to={`/fullblog/${blog._id}`}>
          <img
            src={image}
            alt="Article cover"
            className="w-full max-w-full h-auto object-cover m-2 rounded-lg sm:max-w-xs sm:w-64 sm:h-44"
          />
        </Link>

        <div className="relative z-10 flex flex-col justify-between h-36 lg:h-fit w-full lg:w-full text-white p-3">
          <div className="ml-2 md:ml-5">
            <p className="font-bit mb-1 md:mb-2 text-amber-100 text-xs md:text-base">
              {blog.category}
            </p>
            <Link to={`/fullblog/${blog._id}`}>
              <h1 className="max-w-full lg:max-h-24 text-base md:text-xl font-subtitle font-semibold lg:font-semimedium overflow-hidden hover:cursor-pointer">
                {title}
              </h1>
            </Link>
            <div className="flex gap-1 md:gap-2">
              <p className="text-xs md:text-base text-stone-500 font-subtitle border-l-4 border-stone-500 pl-1 md:pl-2 mt-1 md:mt-2 font-bold">
                by {author}
              </p>
              <p className="text-xs md:text-base text-stone-500 font-subtitle pl-1 md:pl-2 mt-1 md:mt-2 font-bold">
                {formatCreatedAt(blog.createdAt)}
              </p>
              <div className="flex gap-1 md:gap-2 items-center mt-1 md:mt-2 ml-2 md:ml-4 text-stone-500 cursor-default">
                <GoCommentDiscussion size={18} />
                <p>{totalcomments}</p>
              </div>
            </div>
            {/* <div className="mt-2">
              <p
                className="text-stone-400 text-lg font-light"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              ></p>
            </div> */}
          </div>

          <div className="flex gap-4 items-center"></div>
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

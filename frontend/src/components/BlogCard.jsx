import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import TrendingFlatRoundedIcon from "@mui/icons-material/TrendingFlatRounded";

const BlogCard = ({ title, author, image, blog, content }) => {
  // Function to strip HTML tags from content
  const stripHtmlTags = (htmlContent) => {
    return htmlContent.replace(/<[^>]*>?/gm, " ");
  };

  return (
    <div className="flex m-auto justify-center">
      <div className="border border-stone-100 rounded-xl shadow-md w-full lg:w-8/12 h-64 lg:h-fit flex flex-row justify-around gap-5 lg:gap-10 m-0 lg:m-5 lg:ml-14 p-5 mt-5 bg-white">
        <img
          src={image}
          alt=""
          className="lg:h-full lg:ml-5 rounded-xl lg:w-full lg:max-w-md w-32 h-28"
        />
        <div className="w-9/12 h-80">
          <h1 className="text-base lg:text-3xl font-title text-stone-700 font-semibold">
            {title}
          </h1>
          <p className="text-xs lg:text-base font-subtitle border-l-4 border-stone-300 pl-2 text-stone-500 cursor-pointer mt-2 font-medium ">
            by {author}
          </p>
          <h2 className="font-subtitle text-stone-800 mt-6 text-xs lg:text-base max-h-12 lg:max-h-24  overflow-hidden ">
            {stripHtmlTags(content)} {/* Render content without HTML tags */}
          </h2>
          <div className="w-full flex justify-end items-end mr-5">
            <button className="bg-stone-800 text-white h-8 lg:h-10 w-28 lg:w-40 text-xs lg:text-sm p-1 font-subtitle mt-4 lg:mt-5 rounded-md font-light items-end">
              <Link to={`/fullblog/${blog._id}`}>
                Read <TrendingFlatRoundedIcon className="ml-1" />
              </Link>
            </button>
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
  content: PropTypes.string.isRequired,
};

export default BlogCard;

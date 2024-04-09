import React from "react";
import pic from "../assets/pexels-kyle-miller-20272816.jpg";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import TrendingFlatRoundedIcon from "@mui/icons-material/TrendingFlatRounded";
const BlogCard = ({ title, author, image, blog, content }) => {
  return (
    <div>
      <div className="border border-stone-100 rounded-xl shadow-md w-11/12 h-80 flex flex-row justify-around gap-10 m-5 ml-14 p-5 mt-5 bg-white">
        <img src={image} alt="" className="h-full ml-5 rounded-xl max-w-md" />
        <div className="w-9/12 h-80">
          <h1 className="text-3xl font-title text-stone-700 font-semibold">
            {title}
          </h1>
          <p className="font-subtitle text-stone-500 cursor-pointer mt-2 font-medium ">
            by {author}
          </p>
          <h2 className="font-subtitle text-stone-800 mt-6 max-h-24 overflow-hidden ">
            {content}
          </h2>
          <div className="w-full flex justify-end items-end mr-5">
            <button className="bg-stone-800 text-white h-10 w-40 text-sm p-1 font-subtitle mt-5 rounded-md font-light items-end">
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

import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import TrendingFlatRoundedIcon from "@mui/icons-material/TrendingFlatRounded";

const BlogTextCard = ({ title, author, image, category, textblog }) => {
  // Function to strip HTML tags from content
  // const stripHtmlTags = (htmlContent) => {
  //   return htmlContent.replace(/<[^>]*>?/gm, " ");
  // };
  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const options = { month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="flex w-full">
      <div className="relative border border-stone-800 shadow-lg w-full lg:w-full h-52 lg:h-fit flex flex-col justify-around gap-2 lg:gap-2 m-0 lg:m-0 lg:ml bg-stone-900 overflow-hidden hover:shadow-xl">
        {/* <img
          src={image}
          alt="Article cover"
          className="w-full h-48 object-cover"
        /> */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-black via-red/70 via-black/50 to-transparent rounded-xl"></div> */}
        <Link to={`/fullblog/${textblog._id}`}>
          <div className="relative z-10 flex flex-col justify-between h-44 lg:h-fit w-full text-white p-5">
            <div>
              <p className="font-title text-base mb-2 text-amber-100">
                {category}
              </p>
              <h1 className=" max-w-full lg:max-h-24 lg:text-lg text-xl font-subtitle font-semibold lg:font-semimedium overflow-hidden hover:cursor-pointer">
                {title}
              </h1>
              <div className="flex gap-2">
                <p className="text-xs text-stone-400 lg:text-xs font-subtitle border-l-4 border-stone-500 pl-2 mt-2 font-extralight">
                  by {author}
                </p>
                <p className="text-xs text-stone-400 lg:text-xs font-subtitle pl-2 mt-2 font-extralight">
                  {formatCreatedAt(textblog.createdAt)}
                </p>
              </div>
            </div>
            {/* <div className="flex justify-end items-end">
              <button className="bg-stone-950 text-white h-8 lg:h-10 w-28 lg:w-40 text-xs lg:text-sm p-1 font-subtitle rounded-md font-light items-end">
                <Link to={`/fullblog/${blog._id}`}>
                  Read <TrendingFlatRoundedIcon className="ml-1" />
                </Link>
              </button>
            </div> */}
          </div>
        </Link>
      </div>
    </div>
  );
};

BlogTextCard.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  textblog: PropTypes.number.isRequired,
  content: PropTypes.string,
};

export default BlogTextCard;

import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import TrendingFlatRoundedIcon from "@mui/icons-material/TrendingFlatRounded";

const BlogTextCard = ({ title, author, image, category, textblog }) => {
  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const options = { month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="flex m-auto justify-start">
      <div className="relative rounded-2xl shadow-lg w-full lg:w-full lg:h-fit flex flex-row gap-5 lg:gap-2 m-0 lg:m-5 lg:ml-14 mt-5 bg-black overflow-hidden hover:shadow-xl">
        <div className="relative z-10 flex flex-col justify-between h-36 lg:h-fit w-full lg:w-full text-white p-3">
          <div className="ml-5">
            <p className="font-bit mb-2 text-amber-100">{category}</p>
            <Link to={`/fullblog/${textblog._id}`}>
              <h1 className="max-w-full lg:max-h-24 lg:text-xl text-xl font-subtitle font-semibold lg:font-semimedium overflow-hidden hover:cursor-pointer">
                {title}
              </h1>
            </Link>
            <div className="flex gap-2">
              <p className="text-xs text-stone-500 lg:text-base font-subtitle border-l-4 border-stone-500 pl-2 mt-2 font-bold">
                by {author}
              </p>
              <p className="text-xs text-stone-500 lg:text-base font-subtitle pl-2 mt-2 font-bold">
                {formatCreatedAt(textblog.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BlogTextCard.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  image: PropTypes.string,
  category: PropTypes.string,
  textblog: PropTypes.object.isRequired,
};

export default BlogTextCard;

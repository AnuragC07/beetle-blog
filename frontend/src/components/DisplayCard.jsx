import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const DisplayCard = ({ title, author, category, textblog, image }) => {
  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const options = { month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="w-full max-w-full mx-1 md:mx-2 rounded-lg p-1 md:p-2 mb-1 md:mb-2 shadow hover:shadow-lg transition-shadow flex flex-col sm:flex-row">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full max-w-full h-auto object-cover rounded-md mb-2 mr-4 sm:max-w-xs sm:w-32 sm:h-32"
        />
      )}
      <div className="flex flex-col gap-1">
        <Link to={`/fullblog/${textblog._id}`}>
          {category && (
            <span className="text-amber-100 font-bit text-xs md:text-base mb-1 md:mb-2">
              #{category}
            </span>
          )}
          <h2 className="text-base md:text-lg font-bold text-white mb-1 truncate whitespace-normal overflow-visible cursor-pointer max-h-15 font-subtitle">
            {title}
          </h2>
        </Link>
        <div className="flex flex-col items-left text-white text-sm md:text-lg mb-1 md:mb-2">
          <div className="flex flex-row items-start justify-start gap-1 md:gap-2">
            <p className="text-xs md:text-base text-stone-500 font-subtitle border-l-4 border-stone-500 pl-1 md:pl-2 mt-1 md:mt-2 font-bold">
              by {author}
            </p>
            <p className="text-xs md:text-base text-stone-500 font-subtitle pl-1 md:pl-2 mt-1 md:mt-2 font-bold">
              {formatCreatedAt(textblog.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

DisplayCard.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  textblog: PropTypes.object.isRequired,
  image: PropTypes.string,
};

export default DisplayCard;

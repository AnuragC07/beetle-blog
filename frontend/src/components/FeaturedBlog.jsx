import React from "react";
import { Link } from "react-router-dom";

const formatCreatedAt = (createdAt) => {
  const date = new Date(createdAt);
  const options = { month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

const FeaturedBlog = ({ title, author, image, category, blog }) => {
  return (
    <>
      <Link to={`/fullblog/${blog._id}`}>
        <div className="bg-stone-950 rounded-3xl shadow-lg gap-9 flex flex-row items-center p-2 mb-8">
          <img
            src={image}
            alt={title}
            className="w-2/3 max-h-80 object-cover rounded-2xl mb-6 shadow-md"
          />
          <div className="flex flex-col gap-4 min-w-40">
            <h2 className="text-3xl font-extrabold text-amber-100 mb-2 text-left font-title">
              {title}
            </h2>
            <div className="flex flex-col items-left text-white text-lg mb-2">
              <div className="flex flex-row items-start justify-start gap-2">
                <p className="text-xs text-stone-500 lg:text-base font-subtitle border-l-4 border-stone-500 pl-2 mt-2 font-bold">
                  by {author}
                </p>
                <p className="text-xs text-stone-500 lg:text-base font-subtitle pl-2 mt-2 font-bold">
                  {formatCreatedAt(blog.createdAt)}
                </p>
              </div>
              {category && (
                <span className="text-amber-100 font-title text-base mt-1">
                  #{category}
                </span>
              )}
            </div>
            {/* Add more info here if needed, e.g., date, excerpt, etc. */}
          </div>
        </div>
      </Link>
    </>
  );
};

export default FeaturedBlog;

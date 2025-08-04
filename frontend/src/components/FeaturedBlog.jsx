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
        <div className="bg-black rounded-3xl shadow-lg gap-2 md:gap-6 flex flex-col sm:flex-row p-1 md:p-2 mb-1 md:mb-2 w-full max-w-full">
          <img
            src={image}
            alt={title}
            className="w-full max-w-full h-auto object-cover rounded-2xl mb-2 shadow-md sm:max-w-xl sm:max-h-64"
          />
          <div className="flex flex-col gap-2 min-w-40 justify-start h-fit">
            <h2 className="text-lg md:text-3xl font-extrabold text-amber-100 mb-1 md:mb-2 text-left font-title">
              {title}
            </h2>
            <div className="flex flex-col items-left text-white text-sm md:text-lg mb-1 md:mb-2">
              <div className="flex flex-row items-start justify-start gap-1 md:gap-2">
                <p className="text-xs md:text-base text-stone-500 font-subtitle border-l-4 border-stone-500 pl-1 md:pl-2 mt-1 md:mt-2 font-bold">
                  by {author}
                </p>
                <p className="text-xs md:text-base text-stone-500 font-subtitle pl-1 md:pl-2 mt-1 md:mt-2 font-bold">
                  {formatCreatedAt(blog.createdAt)}
                </p>
              </div>
              {category && (
                <span className="text-amber-100 font-bit text-xs md:text-base mt-1">
                  #{category}
                </span>
              )}
              <div className="mt-1 md:mt-2 h-4">
                <p
                  className="text-stone-600 font-subtitle text-xs md:text-sm font-normal max-h-10 overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default FeaturedBlog;

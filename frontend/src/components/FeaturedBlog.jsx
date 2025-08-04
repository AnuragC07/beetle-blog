import React from "react";
import { Link } from "react-router-dom";

const formatCreatedAt = (createdAt) => {
  const date = new Date(createdAt);
  const options = { month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

const FeaturedBlog = ({ title, author, image, category, blog }) => {
  return (
    <Link to={`/fullblog/${blog._id}`}>
      <div className="bg-black rounded-2xl shadow-lg mb-6 overflow-hidden hover:shadow-xl transition-shadow">
        <div className="flex flex-col md:flex-row">
          <img
            src={image}
            alt={title}
            className="w-full md:w-1/2 h-48 md:h-64 object-cover"
          />
          <div className="flex flex-col justify-between p-4 md:p-6 text-white">
            <div>
              <p className="text-amber-100 font-bit text-xs md:text-sm mb-2">
                {category}
              </p>
              <h2 className="text-lg md:text-2xl lg:text-3xl font-bold mb-4 font-title">
                {title}
              </h2>
              <div className="flex items-center gap-2 md:gap-4 text-stone-500 text-xs md:text-sm">
                <p className="font-subtitle">by {author}</p>
                <p className="font-subtitle">
                  {formatCreatedAt(blog.createdAt)}
                </p>
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

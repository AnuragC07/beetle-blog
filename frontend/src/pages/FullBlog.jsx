import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import PropTypes from "prop-types";

const FullBlog = () => {
  const [blog, setBlog] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/${id}`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    return `${date.toLocaleDateString()} `;
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center">
        <div className="m-5 mt-5 flex flex-col w-2/4">
          <div className="text-left items-start pl-2">
            <h1 className="text-5xl font-bold font-title text-stone-700 w-full text-left items-left">
              {blog.title}
            </h1>
            <p className="text-xl text-stone-400 cursor-pointer font-subtitle font-semibold flex mt-5 mb-5">
              by {blog.author}
              <div className="font-subtitle font-semibold text-xl ml-2">
                {formatCreatedAt(blog.createdAt)}
              </div>
            </p>
          </div>
          <hr />
          <img
            src={`http://localhost:8000/images/${blog.image}`}
            alt=""
            className="h-1/2 w-full rounded-md mt-10"
          />
          <div
            className="font-title text-gray-900 font-medium text-xl mt-10 leading-9 ql-editor"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></div>
        </div>
      </div>
    </div>
  );
};

FullBlog.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default FullBlog;

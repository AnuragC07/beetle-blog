import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import PropTypes from "prop-types";
import BlogTextCard from "../components/BlogTextCard";

const decodeToken = (token) => {
  const payload = token.split(".")[1];
  return JSON.parse(atob(payload));
};

const FullBlog = () => {
  const [blog, setBlog] = useState({});
  const [textblogs, setTextBlogs] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // Call the function to get username when the component mounts

    const token = localStorage.getItem("jwtToken");
    // console.log("Token:", token);
    // Set the Authorization header in axios request config
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`http://localhost:8000/${id}`, config)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });

    axios
      .get("http://localhost:8000/", config)
      .then((response) => {
        setTextBlogs(response.data.data);
        // console.log(response.data.data);
      })
      .catch(() => {
        // console.log("Axios Error:", error);
      });
  }, [id]);

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    return `${date.toLocaleDateString()} `;
  };

  return (
    <div>
      <Navbar />
      <section className="flex gap-2 bg-stone-900">
        <div className="flex justify-center mt-1 bg-stone-900 w-11/12">
          <div className="m-1 mt-12 flex flex-col w-full lg:w-4/5 bg-stone-900">
            <div className="text-left items-start pl-2 border-b border-b-stone-700">
              <h1 className="text-4xl lg:text-5xl font-bold font-title text-amber-50 w-full text-left items-left mt-4 lg:mt-20">
                {blog.title}
              </h1>
              <p className="text-lg lg:text-xl border-l-4 border-stone-400 text-stone-400 pl-2 cursor-pointer font-subtitle font-semibold flex mt-5 mb-5">
                by {blog.author}
                <div className="font-subtitle font-semibold text-xl ml-2">
                  {formatCreatedAt(blog.createdAt)}
                </div>
              </p>
            </div>
            <img
              src={`http://localhost:8000/images/${blog.image}`}
              alt=""
              className="h-1/2 w-full rounded-md mt-10"
            />
            <div
              className="font-title text-stone-200 font-medium text-xl mt-10 leading-9 ql-editor"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            ></div>
          </div>
        </div>
        <div className="w-[600px] border border-stone-700 text-white">
          <div className="flex justify-center items-center">
            <p className="mt-28 mb-10 text-white font-title text-2xl">
              Latest Articles
            </p>
          </div>
          <div className="mt-0">
            {/* Add a check to ensure textblogs exists before calling slice */}
            {textblogs && textblogs.length > 0 ? (
              textblogs
                .slice()
                .reverse()
                .map((textblog, index) => (
                  <BlogTextCard
                    key={index}
                    title={textblog.title}
                    author={textblog.author}
                    image={`http://localhost:8000/images/${textblog.image}`}
                    textblog={textblog}
                  />
                ))
            ) : (
              <p className="text-red-500">No articles available</p>
            )}
          </div>
        </div>
      </section>
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

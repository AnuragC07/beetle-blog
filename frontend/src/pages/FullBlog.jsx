import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import PropTypes from "prop-types";
import BlogTextCard from "../components/BlogTextCard";
import { GoCommentDiscussion } from "react-icons/go";
import { AiOutlineLike } from "react-icons/ai";

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
              <p className="font-title mb-2 text-amber-100 mt-4 lg:mt-20 border w-fit rounded-2xl px-4 py-1 border-stone-800">
                Environment
              </p>
              <h1 className="text-4xl lg:text-5xl font-bold font-title text-amber-50 w-full text-left items-left ">
                {blog.title}
              </h1>
              <div className="flex justify-between">
                <p className="text-lg lg:text-xl border-l-4 border-stone-400 text-stone-400 pl-2 cursor-pointer font-subtitle font-semibold flex mt-5 mb-5">
                  by {blog.author}
                  <div className="font-subtitle font-semibold text-xl ml-2">
                    {formatCreatedAt(blog.createdAt)}
                  </div>
                </p>
                <div className="flex gap-4 items-center">
                  <div className=" bg-stone-800 h-10 rounded-full px-4 flex gap-2 items-center hover:bg-stone-700 transition-colors duration-300 text-stone-400 cursor-pointer">
                    <AiOutlineLike size={20} />
                    <p>20</p>
                  </div>
                  <div className=" bg-stone-900 h-10 rounded-full py-2 px-4 flex gap-2 items-center transition-colors duration-300 text-stone-400 cursor-pointer">
                    <GoCommentDiscussion size={20} />
                    <p>2</p>
                  </div>
                </div>
              </div>
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
            <div class="w-full bg-stone-900 p-5 text-white border-t border-stone-700 mt-10">
              <h2 class="text-3xl  font-normal mb-3 font-title">Comments</h2>

              <div class="flex gap-2 mb-5">
                <input
                  type="text"
                  placeholder="write a comment"
                  class="w-full p-2 border-b border-stone-600 bg-stone-900 text-stone-200 outline-none placeholder:text-stone-600 font-subtitle"
                />
                <button class="p-2 bg-stone-900 border border-stone-800  hover:bg-stone-800 transition-colors rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
              </div>

              <div class="bg-stone-900 p-4 rounded-lg mb-3 cursor-default">
                <p class="mb-2 font-title text-lg">“It was a fantastic read”</p>
                <div class="text-sm text-stone-400 flex gap-4">
                  <p className="text-stone-500 font-subtitle">Alex</p>
                  <p className="text-stone-500 font-subtitle">2 days ago</p>
                </div>
              </div>

              <div class="bg-stone-900 p-4 rounded-lg cursor-default">
                <p class="mb-2 font-title text-lg">“It was a fantastic read”</p>
                <div class="text-sm text-stone-400 flex gap-4">
                  <p className="text-stone-500 font-subtitle">Alex</p>
                  <p className="text-stone-500 font-subtitle">2 days ago</p>
                </div>
              </div>
            </div>
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

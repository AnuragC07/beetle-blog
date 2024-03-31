import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import pic from "../assets/pexels-kyle-miller-20272816.jpg";
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
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center">
        <div className="m-5 mt-5 flex flex-col w-2/3">
          <div className="text-left items-start pl-2">
            <h1 className="text-4xl font-bold font-serif text-stone-700 w-full text-left items-left">
              {blog.title}
            </h1>
            <p className="text-gray-400 cursor-pointer mt-4 font-light">
              {blog.author}
            </p>
          </div>
          <img
            src={`http://localhost:8000/images/${blog.image}`}
            alt=""
            className="h-1/2 w-full rounded-xl mt-5"
          />
          <div>
            <h2 className="text-gray-700 font-sans text-xl mt-10">
              {blog.content}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

FullBlog.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  blog: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
};
export default FullBlog;

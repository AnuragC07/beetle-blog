import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import TrendingFlatRoundedIcon from "@mui/icons-material/TrendingFlatRounded";
import BlogCard from "../components/BlogCard";
import Footer from "../components/Footer";
const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("jwtToken");
    console.log("Token:", token);
    // Set the Authorization header in axios request config
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Send the GET request with the token included in the headers
    axios
      .get("http://localhost:8000/", config)
      .then((response) => {
        setBlogs(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log("Axios Error:", error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div id="vw1" className="flex m-10 mt-20 gap-20">
        <div className="flex flex-col justify-between items-start gap-10">
          <div className="mt-10">
            <h1 className="text-4xl text-gray-700">Good Evening, Anurag</h1>
            <h3 className="text-xl w-10/12 mt-5 text-gray-400">
              Welcome back on Beetle, check out fresh articles served just for
              you!
            </h3>
          </div>
          <button className="bg-zinc-800 text-white h-10 w-40 text-sm p-1  mt-10 rounded-md font-light">
            Explore <TrendingFlatRoundedIcon className="ml-1" />
          </button>
        </div>
        <div className="relative w-1/2">
          {blogs.length > 0 && (
            <>
              <img
                src={`http://localhost:8000/images/${blogs[2].image}`}
                alt=""
                className="w-full rounded-3xl"
              />
              <Link to={`/fullblog/${blogs[2]._id}`}>
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-black/100 to-black/90 rounded-t-3xl w-full pl-10 h-28 cursor-pointer">
                  <p className=" text-left text-white border border-gray-500 w-fit p-1 pl-3 pr-3 rounded-3xl font-extralight text-sm mt-3 bg-opacity-30 backdrop-blur-3xl">
                    featured
                  </p>
                  <h2 className="text-lg font-light text-left text-white mt-4">
                    {blogs[2].title}
                  </h2>
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="bg-stone-950 rounded-t-3xl p-5 mt-24">
        <h1 className="text-4xl font-light text-white m-5 mb-10">
          Latest Articles
        </h1>
        <div className="mt-5">
          {blogs.map((blog, index) => (
            <BlogCard
              key={index}
              title={blog.title}
              // Construct the URL to the image using the filename
              image={`http://localhost:8000/images/${blog.image}`}
              blog={blog}
              content={blog.content}
            />
          ))}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;

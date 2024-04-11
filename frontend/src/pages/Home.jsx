import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import TrendingFlatRoundedIcon from "@mui/icons-material/TrendingFlatRounded";
import BlogCard from "../components/BlogCard";
import Footer from "../components/Footer";
import heroimg from "../assets/bwink_med_12_single_01 1.png";
const decodeToken = (token) => {
  const payload = token.split(".")[1];
  return JSON.parse(atob(payload));
};

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    // Function to get the username from JWT token stored in localStorage
    const getUsernameFromToken = () => {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        // Decode the JWT token to get user information
        const decodedToken = decodeToken(token);
        // Assuming the username is stored in the decoded token as 'username'
        setUsername(decodedToken.username);
      }
    };

    // Call the function to get username when the component mounts
    getUsernameFromToken();

    // Get current time and set greeting
    const currentTime = new Date().getHours();
    if (currentTime >= 5 && currentTime < 12) {
      setGreeting("Good Morning");
    } else if (currentTime >= 12 && currentTime < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []); // Empty dependency array ensures the effect runs only once

  useEffect(() => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("jwtToken");
    // console.log("Token:", token);
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
        // console.log(response.data.data);
      })
      .catch((error) => {
        // console.log("Axios Error:", error);
      });
  }, []);

  const handleExploreButtonClick = () => {
    // Smooth scroll to the "Latest Articles" section
    const latestArticlesSection = document.getElementById("latest-articles");
    latestArticlesSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Navbar />
      <div id="vw1" className="flex justify-around m-10 mt-20 gap-20">
        <div className="flex flex-col justify-around items-start gap-10">
          <div className="mt-10">
            <h1 className="text-5xl text-stone-700 font-title">
              {greeting}, {username}.
            </h1>
            <h3 className="text-4xl font-subtitle w-10/12 text-stone-400 font-medium mt-10">
              Welcome back on Beetle, check out fresh articles served just for
              you!
            </h3>
          </div>
          <button
            className="bg-stone-900 text-white h-10 w-40 text-sm p-1 rounded-md  font-subtitle"
            onClick={handleExploreButtonClick}
          >
            Explore <TrendingFlatRoundedIcon className="ml-1" />
          </button>
        </div>
        <img src={heroimg} alt="" className="w-2/4" />
      </div>
      <div
        id="latest-articles"
        className="bg-stone-100 rounded-t-3xl p-5 mt-24"
      >
        <h1 className="text-4xl font-subtitle font-medium text-stone-500 m-5 mb-10">
          Latest stories
        </h1>
        <div className="mt-5">
          {blogs
            .slice()
            .reverse()
            .map((blog, index) => (
              <BlogCard
                key={index}
                title={blog.title}
                author={blog.author}
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

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
// import { Link } from "react-router-dom";
import TrendingFlatRoundedIcon from "@mui/icons-material/TrendingFlatRounded";
import BlogCard from "../components/BlogCard";
import BlogTextCard from "../components/BlogTextCard";
import Footer from "../components/Footer";
import heroimg from "../assets/bwink_med_12_single_01 1.png";
const decodeToken = (token) => {
  const payload = token.split(".")[1];
  return JSON.parse(atob(payload));
};

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [textblogs, setTextBlogs] = useState([]);
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
        setTextBlogs(response.data.data);
        // console.log(response.data.data);
      })
      .catch(() => {
        // console.log("Axios Error:", error);
      });
  }, []);

  const handleExploreButtonClick = () => {
    // Smooth scroll to the "Latest Articles" section
    const latestArticlesSection = document.getElementById("latest-articles");
    latestArticlesSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-stone-900">
      <Navbar />
      <section className="flex gap-4 w-full bg-stone-900">
        <div className="w-screen">
          <div
            id="vw1"
            className="flex justify-around flex-col p-2 pt-10 gap-14 bg-stone-900 ml-12"
          >
            <div className="flex flex-col justify-start items-start gap-10">
              {/* <div className="mt-14">
                <h1 className="text-4xl lg:text-3xl text-amber-50 font-title ml-4">
                  {greeting}, {username}.
                </h1>
              </div> */}
            </div>
            <div>
              <li className="flex gap-8 w-full borde text-amber-100 font-title justify-around items-center">
                <ul className="cursor-pointer border text-sm border-stone-800 flex items-center bg-stone-900 hover:bg-stone-950 px-4 h-10 rounded-2xl transition-colors duration-300">
                  <p>Environment</p>
                </ul>

                <ul className="cursor-pointer flex items-center border text-sm border-stone-800 bg-stone-900 hover:bg-stone-950 px-4 h-10 rounded-2xl transition-colors duration-300">
                  <p>Gaming</p>
                </ul>
                <ul className="cursor-pointer flex items-center border text-sm border-stone-800 bg-stone-900 hover:bg-stone-950 px-4 h-10 rounded-2xl transition-colors duration-300">
                  <p>Technology</p>
                </ul>
                <ul className="cursor-pointer flex items-center border text-sm border-stone-800 bg-stone-900 hover:bg-stone-950 px-4 h-10 rounded-2xl transition-colors duration-300">
                  <p>Programming</p>
                </ul>
                <ul className="cursor-pointer flex items-center border text-sm border-stone-800 bg-stone-900 hover:bg-stone-950 px-4 h-10 rounded-2xl transition-colors duration-300">
                  <p>AI</p>
                </ul>
                <ul className="cursor-pointer flex items-center border text-sm border-stone-800 bg-stone-900 hover:bg-stone-950 px-4 h-10 rounded-2xl transition-colors duration-300">
                  <p>Politics</p>
                </ul>
                <ul className="cursor-pointer flex items-center border text-sm border-stone-800 bg-stone-900 hover:bg-stone-950 px-4 h-10 rounded-2xl transition-colors duration-300">
                  <p>Sports</p>
                </ul>
              </li>
            </div>
            {/* <img src={heroimg} alt="" className="hidden lg:block lg:w-2/4" /> */}
          </div>
          <div id="latest-articles" className="bg-stone-900 rounded-t-3xl p-2">
            <div className="mt-0">
              <h1 className="font-stylish text-[50px] ml-16 text-white">
                #foryou
              </h1>
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
                    // content={blog.content}
                  />
                ))}
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
            {textblogs
              .slice()
              .reverse()
              .map((textblogs, index) => (
                <BlogTextCard
                  key={index}
                  title={textblogs.title}
                  author={textblogs.author}
                  image={`http://localhost:8000/images/${textblogs.image}`}
                  textblog={textblogs}
                  // content={blog.content}
                />
              ))}
          </div>
        </div>
      </section>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;

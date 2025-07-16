import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
// import { Link } from "react-router-dom";
import TrendingFlatRoundedIcon from "@mui/icons-material/TrendingFlatRounded";
import BlogCard from "../components/BlogCard";
import BlogTextCard from "../components/BlogTextCard";
import Footer from "../components/Footer";
import heroimg from "../assets/bwink_med_12_single_01 1.png";
import FeaturedBlog from "../components/FeaturedBlog";
const decodeToken = (token) => {
  const payload = token.split(".")[1];
  return JSON.parse(atob(payload));
};

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [textblogs, setTextBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [greeting, setGreeting] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

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
      .get("http://localhost:8000/")
      .then((response) => {
        setBlogs(response.data.data);
        setTextBlogs(response.data.data);
        // console.log(response.data.data);
      })
      .catch(() => {
        // console.log("Axios Error:", error);
      });
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Update selected category
  };

  const filteredBlogs = selectedCategory
    ? blogs.filter((blog) => blog.category === selectedCategory)
    : blogs;

  const handleExploreButtonClick = () => {
    // Smooth scroll to the "Latest Articles" section
    const latestArticlesSection = document.getElementById("latest-articles");
    latestArticlesSection.scrollIntoView({ behavior: "smooth" });
  };

  const categories = [
    "Environment",
    "Gaming",
    "Technology",
    "Programming",
    "AI",
    "Movies",
    "Politics",
    "Sports",
  ];

  // Group blogs by category
  const blogsByCategory = categories.reduce((acc, category) => {
    acc[category] = blogs.filter((blog) => blog.category === category);
    return acc;
  }, {});

  // Helper to render category section
  const renderCategorySection = (category) => {
    const catBlogs = blogsByCategory[category] || [];
    if (catBlogs.length === 0) return null;
    // Find first blog with image for featured, rest as normal
    const featured = catBlogs.find((b) => b.image);
    const rest = catBlogs.filter((b) => b !== featured && b.image);
    const textBlogs = catBlogs.filter((b) => !b.image);
    return (
      <div key={category} className="mb-16">
        <h1 className="font-stylish text-[40px] ml-16 text-white mt-10 mb-4">
          #{category}
        </h1>
        {featured && (
          <FeaturedBlog
            key={featured._id || featured.title}
            title={featured.title}
            author={featured.author}
            image={`http://localhost:8000/images/${featured.image}`}
            category={featured.category}
            blog={featured}
          />
        )}
        {rest.map((blog, idx) => (
          <BlogCard
            key={blog._id || blog.title || idx}
            title={blog.title}
            author={blog.author}
            image={`http://localhost:8000/images/${blog.image}`}
            blog={blog}
          />
        ))}
        {textBlogs.map((blog, idx) => (
          <BlogTextCard
            key={blog._id || blog.title || idx}
            title={blog.title}
            author={blog.author}
            category={blog.category}
            image={
              blog.image
                ? `http://localhost:8000/images/${blog.image}`
                : undefined
            }
            textblog={blog}
          />
        ))}
      </div>
    );
  };

  // For #foryou: pick 4 random blogs, one as featured (with image if possible)
  let forYouBlogs = [];
  let forYouFeatured = null;
  if (blogs.length >= 4) {
    const shuffled = blogs.slice().sort(() => 0.5 - Math.random());
    forYouBlogs = shuffled.slice(0, 4);
    forYouFeatured = forYouBlogs.find((b) => b.image) || forYouBlogs[0];
  } else if (blogs.length > 0) {
    forYouBlogs = blogs.slice();
    forYouFeatured = forYouBlogs.find((b) => b.image) || forYouBlogs[0];
  }

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
                {categories.map((category) => (
                  <ul
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className="cursor-pointer flex items-center border text-sm border-stone-800 bg-stone-900 hover:bg-stone-950 px-4 h-10 rounded-2xl transition-colors duration-300"
                  >
                    <p>{category}</p>
                  </ul>
                ))}
              </li>
            </div>
            {/* <img src={heroimg} alt="" className="hidden lg:block lg:w-2/4" /> */}
          </div>
          <div id="latest-articles" className="bg-stone-900 rounded-t-3xl p-2">
            <div className="mt-0">
              {/* Render #foryou or selected category */}
              {!selectedCategory ? (
                <>
                  <h1 className="font-stylish text-[50px] ml-16 text-white mb-4">
                    #foryou
                  </h1>
                  {forYouFeatured && forYouFeatured.image ? (
                    <FeaturedBlog
                      key={forYouFeatured._id || forYouFeatured.title}
                      title={forYouFeatured.title}
                      author={forYouFeatured.author}
                      image={`http://localhost:8000/images/${forYouFeatured.image}`}
                      category={forYouFeatured.category}
                      blog={forYouFeatured}
                    />
                  ) : null}
                  {forYouBlogs
                    .filter((blog) => blog !== forYouFeatured && blog.image)
                    .map((blog, idx) => (
                      <BlogCard
                        key={blog._id || blog.title || idx}
                        title={blog.title}
                        author={blog.author}
                        image={`http://localhost:8000/images/${blog.image}`}
                        blog={blog}
                      />
                    ))}
                  {forYouBlogs
                    .filter((blog) => !blog.image)
                    .map((blog, idx) => (
                      <BlogTextCard
                        key={blog._id || blog.title || idx}
                        title={blog.title}
                        author={blog.author}
                        category={blog.category}
                        image={
                          blog.image
                            ? `http://localhost:8000/images/${blog.image}`
                            : undefined
                        }
                        textblog={blog}
                      />
                    ))}
                  {/* Render all categories after #foryou */}
                  {categories.map((category) =>
                    renderCategorySection(category)
                  )}
                </>
              ) : (
                // If a category is selected, show only that category
                renderCategorySection(selectedCategory)
              )}
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
                  category={textblogs.category}
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

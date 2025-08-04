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
import BlogTextOnlyCard from "../components/BlogTextCard";
import DisplayCard from "../components/DisplayCard";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
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
  const navigate = useNavigate();
  const [showAllTopStories, setShowAllTopStories] = useState(false);
  const [showAllLatest, setShowAllLatest] = useState(false);
  const [showAllTopics, setShowAllTopics] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    if (category === "Gaming") {
      navigate("/category/gaming");
    } else {
      setSelectedCategory(category);
    }
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
    "Entertainment",
    "Gaming",
    "Technology",
    "Programming",
    "AI",
    "Movies",
    "Politics",
    "Sports",
  ];
  const visibleCategories = categories;

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
      <div key={category} className="mb-8">
        {/* Responsive margin for category title */}
        <h1 className="font-bit text-[32px] md:text-[40px] ml-4 md:ml-16 text-white mt-10 mb-4">
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
          <BlogTextOnlyCard
            key={blog._id || blog.title || idx}
            title={blog.title}
            author={blog.author}
            category={blog.category}
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

  // Find top stories (blogs with most comments)
  const topStories = blogs
    .slice()
    .sort((a, b) => (b.comments?.length || 0) - (a.comments?.length || 0));
  const visibleTopStories = showAllTopStories
    ? topStories
    : topStories.slice(0, 5);
  const visibleLatestArticles = showAllLatest
    ? textblogs.slice().reverse()
    : textblogs.slice().reverse().slice(0, 5);

  // Scroll to section by id
  const handleMobileMenuClick = (id) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="bg-black min-h-screen w-fit">
      {/* Navbar with hamburger for mobile */}
      <div className="relative">
        <Navbar />
        {/* Hamburger icon for mobile */}
        <button
          className="absolute top-4 right-4 z-30 block md:hidden text-white"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label="Open menu"
        >
          <MenuIcon fontSize="large" />
        </button>
        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-80 z-40 flex flex-col items-center justify-center md:hidden">
            <button
              className="absolute top-4 right-4 text-white text-3xl"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
            <nav className="flex flex-col gap-8 text-white text-2xl font-title">
              <button onClick={() => handleMobileMenuClick("topics-section")}>
                Topics to follow
              </button>
              <button
                onClick={() => handleMobileMenuClick("top-stories-section")}
              >
                Top Stories
              </button>
              <button
                onClick={() => handleMobileMenuClick("latest-articles-section")}
              >
                Latest Articles
              </button>
            </nav>
          </div>
        )}
      </div>
      <section className="flex flex-col md:flex-row gap-4 w-full bg-black">
        <div className="w-full md:w-auto">
          {/* Removed topics banner from main section */}
          <div
            id="latest-articles"
            className="bg-black rounded-t-3xl p-2 w-fit max-w-fit"
          >
            <div className="mt-0 w-fit">
              {/* Render #foryou or selected category */}
              {!selectedCategory ? (
                <>
                  <h1 className="font-bit text-[32px] md:text-[50px] ml-4 md:ml-16 text-white mb-4 mt-8 md:mt-16">
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
                  <div className="flex flex-col gap-4">
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
                        <BlogTextOnlyCard
                          key={blog._id || blog.title || idx}
                          title={blog.title}
                          author={blog.author}
                          category={blog.category}
                          textblog={blog}
                        />
                      ))}
                  </div>
                  {/* Render all categories after #foryou */}
                  {categories.map((category) => (
                    <div key={category} className="flex flex-col gap-4">
                      {renderCategorySection(category)}
                    </div>
                  ))}
                </>
              ) : (
                // If a category is selected, show only that category
                renderCategorySection(selectedCategory)
              )}
            </div>
          </div>
        </div>
        {/* Sidebar: hidden on mobile, visible on md+ */}
        <div className="w-full md:w-3/4 border border-stone-700 text-white hidden md:block">
          {/* Topics to follow section */}
          <div id="topics-section" className="flex flex-col pt-10 items-center">
            <h1 className="mb-4 text-white font-title text-2xl mt-12">
              Topics to follow
            </h1>
            <div className="flex flex-row flex-wrap gap-2 justify-center mb-2 w-full px-4">
              {visibleCategories.map((category) => (
                <span
                  key={category}
                  onClick={() =>
                    navigate(`/category/${category.toLowerCase()}`)
                  }
                  className="cursor-pointer px-4 py-1 mb-2 border border-stone-800 bg-black hover:bg-stone-800 text-amber-100 font-bit rounded-2xl text-sm transition-colors duration-300"
                >
                  #{category}
                </span>
              ))}
            </div>
          </div>
          {/* Top Stories Section in Sidebar */}
          <div
            id="top-stories-section"
            className="flex flex-col pt-4 items-center"
          >
            <h1 className="mt-2 mb-8 text-white font-title text-2xl">
              Top Stories
            </h1>
            {visibleTopStories.map((blog, idx) => (
              <DisplayCard
                key={blog._id || blog.title || idx}
                title={blog.title}
                author={blog.author}
                category={blog.category}
                textblog={blog}
                image={
                  blog.image
                    ? `http://localhost:8000/images/${blog.image}`
                    : undefined
                }
              />
            ))}
            {topStories.length > 5 && !showAllTopStories && (
              <div className="flex justify-center w-full">
                <button
                  className="mt-4 px-4 py-2 bg-stone-800 text-white rounded-xl hover:bg-stone-700 transition-colors"
                  onClick={() => setShowAllTopStories(true)}
                >
                  Explore More
                </button>
              </div>
            )}
            {showAllTopStories && (
              <div className="flex justify-center w-full">
                <button
                  className="mt-4 px-4 py-2 bg-stone-800 text-white rounded-xl hover:bg-stone-700 transition-colors"
                  onClick={() => setShowAllTopStories(false)}
                >
                  Show Less
                </button>
              </div>
            )}
          </div>
          {/* Latest Articles Section in Sidebar */}
          <div
            id="latest-articles-section"
            className="flex justify-center items-center"
          >
            <p className="mt-10 mb-8 text-white font-title text-2xl">
              Latest Articles
            </p>
          </div>
          <div className="mt-0">
            {visibleLatestArticles.map((textblog, index) => (
              <DisplayCard
                key={index}
                title={textblog.title}
                author={textblog.author}
                category={textblog.category}
                textblog={textblog}
                // image={
                //   textblog.image
                //     ? `http://localhost:8000/images/${textblog.image}`
                //     : undefined
                // }
              />
            ))}
            {textblogs.length > 5 && !showAllLatest && (
              <div className="flex justify-center w-full">
                <button
                  className="mt-4 px-4 py-2 bg-stone-800 text-white rounded-xl hover:bg-stone-700 transition-colors"
                  onClick={() => setShowAllLatest(true)}
                >
                  Explore More
                </button>
              </div>
            )}
            {showAllLatest && (
              <div className="flex justify-center w-full">
                <button
                  className="mt-4 px-4 py-2 bg-stone-800 text-white rounded-xl hover:bg-stone-700 transition-colors"
                  onClick={() => setShowAllLatest(false)}
                >
                  Show Less
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* <div>
        <Footer />
      </div> */}
    </div>
  );
};

export default Home;

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import FeaturedBlog from "../components/FeaturedBlog";
import DisplayCard from "../components/DisplayCard";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const decodeToken = (token) => {
  const payload = token.split(".")[1];
  return JSON.parse(atob(payload));
};

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [greeting, setGreeting] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
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

  const categories = [
    "Environment",
    "Gaming",
    "Technology",
    "Programming",
    "AI",
    "Politics",
    "Wildlife",
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
      <div key={category} className="mb-8">
        <h1 className="font-bit text-2xl md:text-3xl lg:text-4xl mt-10 mb-6 text-left text-stone-500">
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
          <DisplayCard
            key={blog._id || blog.title || idx}
            title={blog.title}
            author={blog.author}
            category={blog.category}
            textblog={blog}
            image={`http://localhost:8000/images/${blog.image}`}
          />
        ))}
        {textBlogs.map((blog, idx) => (
          <DisplayCard
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

  // Scroll to section by id
  const handleMobileMenuClick = (id) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="bg-black min-h-screen pb-7">
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
            </nav>
          </div>
        )}
      </div>

      {/* Categories at the top */}
      <div id="topics-section" className="flex flex-col pt-8 items-center">
        <h1 className="mb-6 text-white font-title text-xl md:text-2xl">
          Topics to follow
        </h1>
        <div className="flex flex-row flex-wrap gap-3 justify-center mb-8 w-full px-4">
          {categories.map((category) => (
            <span
              key={category}
              onClick={() => navigate(`/category/${category.toLowerCase()}`)}
              className="cursor-pointer px-3 py-1 md:px-4 md:py-2 border border-stone-800 bg-black hover:bg-stone-800 text-amber-100 font-bit rounded-2xl text-xs md:text-sm transition-colors duration-300"
            >
              #{category}
            </span>
          ))}
        </div>
      </div>

      {/* Main content - centered */}
      <div className="max-w-4xl mx-auto px-4">
        {/* Render #foryou or selected category */}
        {!selectedCategory ? (
          <>
            <h1 className="font-bit text-3xl md:text-4xl lg:text-5xl text-white mb-8 text-left">
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
            <div className="space-y-4">
              {forYouBlogs
                .filter((blog) => blog !== forYouFeatured && blog.image)
                .map((blog, idx) => (
                  <DisplayCard
                    key={blog._id || blog.title || idx}
                    title={blog.title}
                    author={blog.author}
                    category={blog.category}
                    textblog={blog}
                    image={`http://localhost:8000/images/${blog.image}`}
                  />
                ))}
              {forYouBlogs
                .filter((blog) => !blog.image)
                .map((blog, idx) => (
                  <DisplayCard
                    key={blog._id || blog.title || idx}
                    title={blog.title}
                    author={blog.author}
                    category={blog.category}
                    textblog={blog}
                  />
                ))}
            </div>
            {/* Render all categories after #foryou */}
            {categories.map((category) => renderCategorySection(category))}
          </>
        ) : (
          // If a category is selected, show only that category
          renderCategorySection(selectedCategory)
        )}
      </div>
    </div>
  );
};

export default Home;

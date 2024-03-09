import React from "react";
import Navbar from "../components/Navbar";
import pic from "../assets/pexels-kyle-miller-20272816.jpg";
import TrendingFlatRoundedIcon from "@mui/icons-material/TrendingFlatRounded";
import BlogCard from "../components/BlogCard";
import Footer from "../components/Footer";
const Home = () => {
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
          <img src={pic} alt="" className="w-full rounded-3xl" />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-opacity-30 backdrop-blur-lg rounded-3xl w-9/12">
            <p className=" text-left text-white border border-gray-500 w-fit p-1 pl-3 pr-3 rounded-3xl font-extralight text-sm mt-3 bg-opacity-30 backdrop-blur-3xl ">
              featured
            </p>
            <h2 className="text-lg font-light text-left text-white mt-4">
              Electric vehicles may emit 1,850 times more particulate matter
              than petrol, diesel cars: Study
            </h2>
          </div>
        </div>
      </div>
      <div className="bg-stone-950 rounded-t-3xl p-5 mt-24">
        <h1 className="text-4xl font-light text-white m-5 mb-10">
          Latest Articles
        </h1>
        <div className="mt-5">
          <BlogCard />
          <BlogCard />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;

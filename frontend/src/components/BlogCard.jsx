import React from "react";
import pic from "../assets/pexels-kyle-miller-20272816.jpg";
import TrendingFlatRoundedIcon from "@mui/icons-material/TrendingFlatRounded";
const BlogCard = () => {
  return (
    <div>
      <div className="border border-stone-800 rounded-xl shadow-md w-11/12 h-80 flex flex-row justify-around gap-10 m-5 ml-14 p-5 mt-5">
        <img src={pic} alt="" className="h-full ml-5 rounded-xl" />
        <div>
          <h1 className="text-2xl font-sans text-white">
            Electric vehicles may emit 1,850 times more particulate matter than
            petrol, diesel cars: Study
          </h1>
          <p className="text-gray-400 cursor-pointer mt-2 font-light">
            @anurag
          </p>
          <h2 className="text-gray-500 font-light text-lg mt-6 max-h-20 overflow-hidden ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
            voluptates animi porro! Facere ducimus sed, odit maxime ipsum alias
            doloremque autem, consectetur cumque at quia quod ipsam iure aut
            sint. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
            corporis quas quos enim nesciunt eos. Dolor inventore omnis
            accusamus optio magni voluptatibus mollitia alias fugiat officiis
            delectus praesentium autem
          </h2>
          <div className="w-full flex justify-end items-end mr-5">
            <button className="bg-zinc-800 text-white h-10 w-40 text-sm p-1  mt-10 rounded-md font-light items-end">
              Read <TrendingFlatRoundedIcon className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

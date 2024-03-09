import React from "react";
import Navbar from "../components/Navbar";
import UserPic from "../assets/pexels-eric-w-3375230.jpg";
const User = () => {
  return (
    <div>
      <div>
        <Navbar />
        <div className="bg-gray-300  h-32 w-11/12 ml-14 m-5 relative">
          <div className="absolute top-20 left-10">
            <div className="flex items-center justify-center gap-8">
              <img
                src={UserPic}
                alt=""
                className="h-32 w-32 rounded-full border border-gray-400 bg-contain cursor-pointer"
              />
              <h1 className="text-2xl mt-3">Jonas Phoenix</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;

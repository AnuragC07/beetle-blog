import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import UserPic from "../assets/pexels-eric-w-3375230.jpg";

// Function to decode JWT token
// Function to decode JWT token
const decodeToken = (token) => {
  const payload = token.split(".")[1];
  return JSON.parse(atob(payload));
};

const User = () => {
  const [username, setUsername] = useState("");

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
  }, []);

  return (
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
            <h1 className="text-2xl mt-3">{username}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;

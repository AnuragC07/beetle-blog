import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const CreateColumn = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwtToken");
      await axios.post(
        "http://localhost:8000/columns",
        { name, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/");
    } catch (err) {
      alert("Failed to create column");
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="flex flex-col justify-center items-center py-12 bg-black">
        <div className="lg:mt-20 flex h-fit flex-col w-full justify-start lg:justify-center items-center mt-4">
          <div className="w-11/12 lg:w-4/5 flex flex-col">
            <input
              type="text"
              className="border-b-2 border-stone-600 w-full bg-black h-16 pl-3 mt-1 mb-2 lg:mb-5 focus:border-stone-600 focus:outline-none text-2xl lg:text-4xl font-medium font-title text-stone-100 placeholder:text-stone-700"
              placeholder="Column Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <textarea
              placeholder="Description of your column"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-b-2 border-stone-600 w-full bg-black h-32 pl-3 mt-1 mb-8 focus:border-stone-600 focus:outline-none text-lg font-subtitle text-stone-100 placeholder:text-stone-700 rounded"
              required
            />
            <div className="flex justify-center items-center pb-14">
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-stone-800 text-stone-200 h-10 text-sm p-1 font-subtitle font-medium w-4/5 mt-8 rounded-md mb-8 transition-colors duration-200 hover:bg-stone-600 hover:text-white"
              >
                Create Column
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateColumn;

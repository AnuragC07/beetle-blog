import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const Create = () => {
  const [value, setValue] = useState("");
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl text-slate-600">Create Blog</h1>
        <div className="p-5 mt-5 flex flex-col w-full justify-center items-center">
          <div className="w-4/5">
            <label className="text-lg text-slate-400 font-normal">
              Article Title
            </label>
            <input
              type="password"
              className="border border-slate-400 w-full bg-white rounded-md h-16 pl-3 font-light mt-1 text-base mb-5"
              placeholder="Enter Your Article Title"
            />
            <label className="text-lg text-slate-400 font-normal mb-2">
              Article Content
            </label>
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              className="rounded-md mt-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Create = () => {
  const [value, setValue] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl text-slate-600">Create Blog</h1>
        <div className="p-5 mt-5 flex flex-col w-full justify-center items-center">
          <div className="w-4/5 flex flex-col">
            <label className="text-lg text-slate-400 font-normal">
              Article Title
            </label>
            <input
              type="text"
              className="border border-slate-400 w-full bg-white rounded-md h-16 pl-3 font-semibold mt-1 text-lg mb-5"
              placeholder="Enter Your Article Title"
            />
            <label className="text-lg text-slate-400 font-normal">
              Article Image
            </label>
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleImageChange}
              className="mt-2"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 rounded-md"
                style={{ maxWidth: "400px", maxHeight: "400px" }}
              />
            )}
            <label className="text-lg text-slate-400 font-normal mt-2">
              Article Content
            </label>
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              className="rounded-md mt-4"
            />
            <div className="flex justify-center items-center">
              <button className="bg-zinc-800 text-white h-10 text-sm p-1 w-4/5 mt-16 rounded-md">
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;

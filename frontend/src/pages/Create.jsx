import { useState, useRef } from "react";
import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
// import { Select, FileInput } from "flowbite-react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./QuillTheme.css";
import toast from "react-hot-toast";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

const Create = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [quillValue, setQuillValue] = useState("");
  const typingTimeout = useRef(null);
  const [file, setFile] = useState("");
  const navigate = useNavigate();
  const [showToolbar, setShowToolbar] = useState(false);

  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

  const handleCloseImage = () => {
    setImagePreview(null);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSaveBlog = () => {
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("category", category);
    formdata.append("file", file);
    formdata.append("content", content);
    axios
      .post("http://localhost:8000/", formdata, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      })
      .then(() => {
        toast.success("Blog Published!");
        navigate("/");
      })
      .catch(() => {
        toast.error("Error occurred! Please fill out all fields");
      });
  };

  async function generateMagicTitle() {
    setTitle("Generating Title...");
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
        method: "post",
        data: {
          contents: [
            {
              parts: [
                {
                  text: `Generate a short, concise, and engaging title for the following content within a few words: ${content}`,
                },
              ],
            },
          ],
        },
      });
      setTitle(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Error generating title:", error);
      setTitle("Failed to generate title. Please try again.");
    }
  }

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 flex flex-col justify-center items-center py-12 bg-black">
        <div className="w-full lg:w-4/5 flex flex-col mt-8">
          <input
            type="text"
            className="border-b-2 border-stone-600 w-full bg-black h-14 pl-3 mt-1 mb-2 lg:mb-5 focus:border-stone-600 focus:outline-none text-lg md:text-2xl lg:text-4xl font-medium font-title text-stone-100 placeholder:text-stone-700"
            placeholder="Article Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            className="cursor-pointer border-b-2 border-b-stone-600 mt-8 outline-none text-base md:text-lg font-subtitle px-3 py-1 bg-black text-stone-100 hover:bg-black"
            value={category}
            onChange={handleCategory}
          >
            <option value="" disabled hidden>
              Select a category
            </option>
            <option value="Environment">Environment</option>
            <option value="Gaming">Gaming</option>
            <option value="Technology">Technology</option>
            <option value="Programming">Programming</option>
            <option value="AI">AI</option>
            <option value="Politics">Politics</option>
            <option value="Sports">Sports</option>
          </select>
          <label
            htmlFor="file-input"
            className="mt-2 lg:mt-5 rounded-lg font-medium font-title text-lg md:text-2xl lg:text-3xl text-stone-600 p-2 cursor-pointer mb-5 lg:mb-10"
          >
            Add Image (optional)
            <AddCircleOutlineRoundedIcon className="ml-2" />
            <input
              id="file-input"
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {imagePreview && (
            <div className="relative mt-2 rounded-md">
              <button
                onClick={handleCloseImage}
                className="absolute top-2 right-2 text-white bg-gray-700 p-1 rounded-full"
              >
                <CloseRoundedIcon />
              </button>
              <img
                src={imagePreview}
                alt="Preview"
                className="lg:w-1/4 w-3/5 rounded-lg"
              />
            </div>
          )}
          {/* Expand/Collapse Toolbar Button */}
          <div className="flex justify-end mt-6 mb-2">
            <button
              className="px-4 py-1 rounded-xl bg-stone-800 text-xs md:text-sm text-white hover:bg-stone-700 transition-colors mb-9"
              onClick={() => setShowToolbar((v) => !v)}
            >
              {showToolbar ? "Collapse Toolbar" : "Expand Toolbar"}
            </button>
          </div>
          {/* Quill Editor */}
          <div className="relative mb-10">
            <ReactQuill
              value={quillValue}
              onChange={(val) => {
                setQuillValue(val);
                if (typingTimeout.current) clearTimeout(typingTimeout.current);
                typingTimeout.current = setTimeout(() => {
                  setContent(val);
                }, 90);
              }}
              theme="snow"
              modules={{
                toolbar: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ size: [] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                  ],
                  ["link"],
                  ["clean"],
                ],
              }}
              className={`custom-quill-editor text-base md:text-lg ${
                !showToolbar ? "ql-toolbar-hidden" : ""
              }`}
            />
          </div>
          <div className="flex justify-center items-center pb-14">
            <button
              className="bg-stone-800 text-stone-200 h-10 text-xs md:text-sm p-1 font-subtitle font-medium w-4/5 mt-20 lg:mt-8 rounded-md mb-8 transition-colors duration-200 hover:bg-stone-600 hover:text-white"
              onClick={handleSaveBlog}
            >
              Publish article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;

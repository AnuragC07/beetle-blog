import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
const Create = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const navigate = useNavigate();

  // const handleImageChange = (e) => {
  //   setFile (e.target.files[0]);
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleCloseImage = () => {
    setImagePreview(null);
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
    formdata.append("file", file);
    formdata.append("content", content);
    console.log(formdata);
    axios
      .post("http://localhost:8000/", formdata)
      .then((res) => {
        alert("Blog Successfully Created 🚀");
        console.log(res);
        navigate("/home");
      })
      .catch((error) => {
        alert("Error Occurred");
        console.log(error);
      });
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label className="text-lg text-slate-400 font-normal">
              Article Image
            </label>
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileChange}
              className="mt-2"
            />
            {imagePreview && (
              <div className="relative mt-2 rounded-md">
                <button
                  onClick={handleCloseImage}
                  className="absolute top-2 right-2 text-white bg-gray-700 p-1 rounded-full"
                >
                  <CloseRoundedIcon />
                </button>
                <img src={imagePreview} alt="Preview" className="w-full" />
              </div>
            )}
            <label className="text-lg text-slate-400 font-normal mt-5">
              Article Content
            </label>
            <textarea
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border border-slate-400 w-full bg-white rounded-md my-2 px-5 py-5 min-h-60 text-slate-600 font-normal text-xl"
              placeholder="Start writing your Blog"
            />

            <div className="flex justify-center items-center">
              <button
                className="bg-zinc-800 text-white h-10 text-sm p-1 w-4/5 mt-16 rounded-md"
                onClick={handleSaveBlog}
              >
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

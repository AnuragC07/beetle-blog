import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Select, FileInput } from "flowbite-react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';


const Create = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const [title, setTitle] = useState("");
  const [magicTitle, setMagicTitle] = useState("");
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
    // console.log(formdata);
    axios
      .post("https://beetle-backend.onrender.com/", formdata, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      })
      .then((res) => {
        toast.success("Blog Published!");
        // console.log(res);
        navigate("/home");
      })
      .catch((error) => {
        toast.error("Error occurred! Please fill out all fields");
      });
  };

  async function generateMagicTitle() {
    setTitle("Generating Title...");

    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCqiytAeq3_LOF7-hJaUKxPaH5XMICEy2U",
        method: "post",
        data: {
          contents: [
            {
              parts: [{
                text: `Generate a short, concise and engaging title for the following content within a few words: ${content}`,
              },],
            },
          ],
          // Add any specific parameters or prompt settings needed to tailor the output
        },
      });

      // Assuming the title is generated in the first candidate of the response
      setTitle(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Error generating title:", error);
      setTitle("Failed to generate title. Please try again.");
    }
  }


  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center pt-12">
        {/* <h1 className="text-4xl font-subtitle font-light text-stone-400 ">
          Write your story
        </h1> */}
        <div className="lg:mt-40 flex h-screen flex-col w-full justify-start lg:justify-center items-center mt-4">
          <div className="w-11/12 lg:w-4/5 flex flex-col">
            {/* <label className="text-lg text-slate-400 font-normal">
              Article Title
            </label> */}
            <input
              type="text"
              className=" border-b-2 border-stone-200 w-full bg-white h-16 pl-3  mt-1 mb-2 lg:mb-5 focus:border-stone-600 focus:outline-none text-2xl lg:text-4xl font-medium font-title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
                className="bg-zinc-400 text-white h-10 text-sm p-1 font-subtitle font-medium w-52 lg:w-64
              rounded-md hover:shadow-md"
                onClick={generateMagicTitle}
              >
                <AutoAwesomeRoundedIcon className="mr-4 text-xs"/> 
                Generate a Magic title
              </button>
            {/* <label className="text-lg text-slate-400 font-normal">
              Article Image
            </label> */}
            {/* <FileInput
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileChange}
              className="mt-2 rounded-lg border-2"
            ></FileInput> */}
            <label
              htmlFor="file-input"
              className="mt-2 lg:mt-5 rounded-lg font-medium font-title text-2xl lg:text-3xl text-stone-500 p-2 cursor-pointer mb-5 lg:mb-10"
            >
              {" "}
              Add Image
              <AddCircleOutlineRoundedIcon className=" ml-2" />
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
                  className="lg:w-1/3 w-3/5  rounded-lg"
                />
              </div>
            )}
            {/* <label className="text-lg text-slate-400 font-normal mt-5">
              Article Content
            </label> */}
            {/* <textarea
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border border-slate-400 w-full bg-white rounded-md my-2 px-5 py-5 min-h-60 text-slate-600 font-normal text-xl"
              placeholder="Start writing your Blog"
            /> */}
            
            <ReactQuill
              value={content}
              onChange={setContent}
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
              className="h-52 mt-5 lg:h-60"
            />

            <div className="flex justify-center items-center">
              <button
                className="bg-zinc-800 text-white h-10 text-sm p-1 font-subtitle font-medium w-4/5 
                mt-28 lg:mt-16 rounded-md mb-8"
                onClick={handleSaveBlog}
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;

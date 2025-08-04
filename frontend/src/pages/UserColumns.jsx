import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import DisplayCard from "../components/DisplayCard";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

const categories = [
  "Environment",
  "Gaming",
  "Technology",
  "Programming",
  "AI",
  "Politics",
  "Wildlife",
];

const UserColumns = () => {
  const { columnId } = useParams();
  const [column, setColumn] = useState(null);
  const [user, setUser] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/column/${columnId}`)
      .then((res) => {
        setColumn(res.data.column);
        setUser(res.data.user);
        setNotFound(false);
      })
      .catch(() => {
        setNotFound(true);
      });
  }, [columnId]);

  if (notFound) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center p-8">
        <Navbar />
        <h2 className="text-2xl font-bold mb-6">Column Not Found</h2>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4">
        <div className="mt-16">
          {column ? (
            <div className="w-full">
              <div className="flex gap-4 items-center mb-6">
                <ArticleOutlinedIcon
                  style={{ color: "#fff", fontSize: 36 }}
                  className="mb-1"
                />
                <h1 className="text-3xl md:text-4xl font-title text-stone-200 font-bold">
                  {column.name}.
                </h1>
              </div>
              <div className="bg-stone-900 p-6 rounded-lg shadow mb-8">
                <p className="text-stone-300 text-base md:text-lg font-subtitle mb-2">
                  {column.description}
                </p>
                {user && (
                  <div className="mt-6 text-stone-400 text-right">
                    <span className="font-subtitle">a column by </span>
                    <span className="font-bold">{user.username}</span>
                  </div>
                )}
              </div>
              <hr className="border-stone-700 mb-8" />
            </div>
          ) : (
            <h2 className="text-2xl font-bold mb-6">Loading...</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserColumns;

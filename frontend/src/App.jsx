import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import FullBlog from "./pages/FullBlog";
import User from "./pages/User";
import Create from "./pages/Create";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/signin" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/fullblog/:id" element={<FullBlog />} />
        <Route path="/user" element={<User />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
};

export default App;

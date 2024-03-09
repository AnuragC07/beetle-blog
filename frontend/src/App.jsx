import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import FullBlog from "./pages/FullBlog";
import User from "./pages/User";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/fullblog" element={<FullBlog />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </div>
  );
};

export default App;

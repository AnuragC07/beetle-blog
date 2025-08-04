import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import FullBlog from "./pages/FullBlog";
import User from "./pages/User";
import Create from "./pages/Create";
import Landing from "./pages/Landing";
import Test from "./pages/Test";
import TopicPage from "./pages/TopicPage";
import CreateColumn from "./pages/CreateColumn";
import UserColumns from "./pages/UserColumns";

const App = () => {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* <Route path="/" element={<Landing />} /> */}
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/fullblog/:id" element={<FullBlog />} />
        <Route path="/user" element={<User />} />
        <Route path="/create" element={<Create />} />
        <Route path="/test" element={<Test />} />
        <Route path="/category/:topic" element={<TopicPage />} />
        <Route path="/createcolumn" element={<CreateColumn />} />
        <Route path="/user/columns" element={<UserColumns />} />
        <Route path="/usercolumns/:columnId" element={<UserColumns />} />
      </Routes>
    </div>
  );
};

export default App;

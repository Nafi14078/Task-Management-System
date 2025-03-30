import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreateTask from "./pages/CreateTask";
import Footer from "./components/footer";
import Home from "./pages/Home"; // Import Home Page
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TaskDetail from './pages/TaskDetail';
import EditTask from "./pages/EditTask";

const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/home" element={<Home />} /> {/* Add Home Page Route */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
          <Route path="/edit-task/:id" element={<EditTask />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;

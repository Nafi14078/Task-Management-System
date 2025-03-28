import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect if not authenticated
    } else {
      setUser(true);
    }

    fetchTasks(); // ✅ Fetch tasks when component loads
  }, [navigate]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Task List</h2>
      <div className="d-flex flex-wrap justify-content-center">
        {tasks.map(task => (
          <div key={task._id} className="card task-card m-3">
            <div className="card-body">
              <h5 className="card-title">{task.title}</h5>
              <p className="card-text">{task.description}</p>
              <p className="badge bg-primary">Priority: {task.priority}</p>
              <p className="text-muted">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
              <p className={`status ${task.status === "Completed" ? "text-success" : "text-danger"}`}>
                Status: {task.status}
              </p>

              {user && (
                <div className="mt-2">
                  <Link to={`/edit-task/${task._id}`} className="btn btn-warning btn-sm mx-1">Edit</Link>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {user && (
        <div className="text-center mt-4">
          <Link to="/create-task" className="btn btn-primary">Create New Task</Link>
        </div>
      )}
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // <-- New state for search
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (err) {
        setError("Failed to fetch tasks");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [navigate, location.state]);

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete task");
    }
  };

  // Filter tasks based on search term
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 alert alert-danger">
        {error} - <button onClick={() => window.location.reload()} className="btn btn-link">Try Again</button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Your Tasks</h2>
        <Link to="/create-task" className="btn btn-primary">
          <i className="bi bi-plus-circle"></i> Create New Task
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search tasks by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredTasks.length === 0 ? (
        <div className="alert alert-info text-center">
          No tasks found. Try adjusting your search!
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredTasks.map((task) => (
            <div
              key={task._id}
              className="col"
              onClick={() => navigate(`/tasks/${task._id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className={`card h-100 ${task.status === "Completed" ? "border-success" : "border-warning"}`}>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <h5 className="card-title">{task.title}</h5>
                    <span className={`badge ${getPriorityBadge(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="card-text text-muted">{task.description}</p>
                  <div className="mb-2">
                    <small className="text-muted">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </small>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className={`badge ${task.status === "Completed" ? "bg-success" : "bg-warning"}`}>
                      {task.status}
                    </span>
                    <div>
                      <Link
                        to={`/edit-task/${task._id}`}
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(task._id);
                        }}
                        className="btn btn-sm btn-outline-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Helper function for priority badge styling
const getPriorityBadge = (priority) => {
  switch (priority) {
    case "High":
      return "bg-danger";
    case "Medium":
      return "bg-primary";
    case "Low":
      return "bg-secondary";
    default:
      return "bg-light text-dark";
  }
};

export default Home;

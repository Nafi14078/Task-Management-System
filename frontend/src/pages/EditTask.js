import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: "",
    status: "",
  });

  // Fetch Task Data
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };
    fetchTask();
  }, [id]);

  // Update Task Function
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        {
          title: task.title,
          description: task.description,
          priority: task.priority,
          dueDate: task.dueDate,
          status: task.status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Task updated successfully:", response.data);
      alert("Task updated successfully!");
      navigate("/"); // Redirect to Home Page
    } catch (error) {
      console.error("Error updating task:", error.response ? error.response.data : error.message);
      alert("Failed to update task. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Task</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Priority</label>
          <select
            className="form-control"
            value={task.priority}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Due Date</label>
          <input
            type="date"
            className="form-control"
            value={task.dueDate}
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-control"
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
          >
            <option value="Incomplete">Incomplete</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTask;

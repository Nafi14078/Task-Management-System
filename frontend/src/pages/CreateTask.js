import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Incomplete");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/api/tasks',
        { title, description, priority, dueDate },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
  
      if (response.status === 201) {
        navigate('/home', { state: { shouldRefresh: true } });
      }
    } catch (error) {
      console.error('Error:', error.response?.data);
      alert(error.response?.data?.message || 'Failed to create task');
    }
  };
  return (
    <div className="container mt-5">
      <h2 className="text-center">Create New Task</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label>Priority</label>
          <select className="form-control" value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Due Date</label>
          <input
            type="date"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Status</label>
          <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Incomplete">Incomplete</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success w-100">Create Task</button>
      </form>
    </div>
  );
};

export default CreateTask;

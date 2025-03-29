import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Ensure dates are properly formatted
        const taskData = {
          ...response.data,
          dueDate: new Date(response.data.dueDate),
          createdAt: new Date(response.data.createdAt)
        };

        setTask(taskData);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load task details');
        console.error('Error fetching task:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, navigate]);

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
      <div className="container mt-5">
        <div className="alert alert-danger">
          {error}
          <button 
            className="btn btn-link" 
            onClick={() => navigate('/home')}
          >
            Back to Tasks
          </button>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">
          Task not found
          <button 
            className="btn btn-link" 
            onClick={() => navigate('/home')}
          >
            Back to Tasks
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Task Details</h2>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <h3>{task.title || 'No title'}</h3>
            <p className="text-muted">
              Created: {task.createdAt.toLocaleString()}
            </p>
          </div>

          <div className="mb-3">
            <h5>Description</h5>
            <p className="lead">{task.description || 'No description'}</p>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <h5>Priority</h5>
              <span className={`badge ${getPriorityBadge(task.priority)}`}>
                {task.priority || 'Not set'}
              </span>
            </div>
            <div className="col-md-4">
              <h5>Status</h5>
              <span className={`badge ${task.status === 'Complete' ? 'bg-success' : 'bg-warning'}`}>
                {task.status || 'Not set'}
              </span>
            </div>
            <div className="col-md-4">
              <h5>Due Date</h5>
              <p>{task.dueDate.toLocaleDateString() || 'Not set'}</p>
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/home')}
            >
              Back to Tasks
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => navigate(`/edit-task/${task._id}`)}
            >
              Edit Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const getPriorityBadge = (priority) => {
  switch (priority) {
    case "High": return "bg-danger";
    case "Medium": return "bg-primary";
    case "Low": return "bg-secondary";
    default: return "bg-light text-dark";
  }
};

export default TaskDetail;
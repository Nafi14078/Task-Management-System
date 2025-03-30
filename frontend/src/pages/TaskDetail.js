import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        console.log('Fetching task with ID:', id); // Debug log
        
        const response = await axios.get(`http://localhost:5000/api/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log('API Response:', response.data); // Debug log
        
        if (response.data) {
          setTask({
            ...response.data,
            dueDate: new Date(response.data.dueDate),
            createdAt: new Date(response.data.createdAt)
          });
        } else {
          console.error('Empty response received');
        }
      } catch (error) {
        console.error('Error details:', {
          message: error.message,
          response: error.response,
          request: error.request
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, navigate]);

  if (loading) {
    return <div className="spinner-border text-primary"></div>;
  }

  if (!task) {
    return (
      <div className="alert alert-danger">
        Failed to load task details. Check console for errors.
        <button onClick={() => navigate('/home')} className="btn btn-link">
          Back to Tasks
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h2>{task.title || 'Untitled Task'}</h2>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <h5>Description</h5>
            <p>{task.description || 'No description available'}</p>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <h5>Priority</h5>
              <span className={`badge ${getPriorityClass(task.priority)}`}>
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
        </div>
      </div>
    </div>
  );
};

const getPriorityClass = (priority) => {
  switch (priority) {
    case 'High': return 'bg-danger';
    case 'Medium': return 'bg-primary';
    case 'Low': return 'bg-secondary';
    default: return 'bg-light text-dark';
  }
};

export default TaskDetail;
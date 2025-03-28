import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <h2>User Profile</h2>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
      <p>Account Created: {new Date(user?.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default Dashboard;
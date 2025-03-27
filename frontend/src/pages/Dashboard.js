import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="container dashboard-container">
      <h2>Dashboard</h2>
      <button onClick={logout} className="btn btn-danger">Logout</button>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, useNavigate } from "react-router-dom";
import AddTask from "./addTask";

export default function Home() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  // const navigate = useNavigate();

  useEffect(() => {
   
    setToken(localStorage.getItem("token"));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    // navigate('/login'); 
  };

  return (
    <div>
      <div className="flex justify-between items-center h-20 bg-slate-500 px-4">
        <div className="flex-1"></div>
        <ul className="flex">
          <li>
            {token ? (
              <button onClick={logout} className="text-white">Logout</button>
            ) : (
              <Link to="/login" className="text-white">Login</Link>
            )}
          </li>
        </ul>
      </div>
      <AddTask />
    </div>
  );
}

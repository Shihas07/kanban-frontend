import React from "react";
import { BrowserRouter as router, Link } from "react-router-dom";
import AddTask from "./addTask";

export default function Home() {
  return (
    <div>
    <div className="flex justify-between items-center h-20 bg-slate-500 px-4">
    <div className="flex-1"></div> {}
    <ul className="flex">
      <li>
        <Link to="/login" className="text-white">login</Link>
      </li>
    </ul>
    
  </div>
     <AddTask/>
     
  </div>
  );
}

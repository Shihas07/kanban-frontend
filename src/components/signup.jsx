import React from "react";
// import "./signup.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { data } from "autoprefixer";
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as router, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';



export default function Signup() {
  const [datas, setData] = useState([data]);
  const navigate=useNavigate()
  console.log(datas);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("shihas", data);
    axios
      .post("http://localhost:5000/signup", data)

      .then((res) => {
        console.log(res);
        
        toast.success(res.data.message)
        navigate("/")


       
      })
      .catch((error) => {

        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="parent mx-20 mt-5 flex justify-center items-center h-screen">
      <div className="main bg-white  h-auto shadow-2xl">
        <ToastContainer />
        <h1 className="text-3xl font-bold text-center mt-10">Sign-up</h1>

        <div className="mx-12 mt-5   h-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              className="  rounded-lg mt-5 p-2 border"
              placeholder="Name"
              onChange={(e) => setData(e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
            <br />
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              type="text"
              className="  rounded-lg mt-5 p-2 border"
              placeholder="Email"
              onChange={(e) => setData(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            <br />
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              type="password"
              className="  rounded-lg mt-5 border p-2"
              placeholder="Password"
              onChange={(e) => setData(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            <br />
            <button
              type="submit"
              className="bg-purple-950 rounded-md    text-white mx-10 mt-5 my-10"
            >
              Submit
            </button>
          </form>
          <Link to="/login">login</Link>

        </div>
      </div>
    </div>
  );
}

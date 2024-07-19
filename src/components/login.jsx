import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

export default function Login() {
  const [store, setStore] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios
      .post("http://localhost:5000/login", data)
      .then((res) => {
        console.log(res);
        const result = res.data.token;

        localStorage.setItem("token",result)
        const val = jwtDecode(result);
       
           

        // setStore(userDetails.name);

       
        navigate("/");

        
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  // console.log(store)
  // useEffect(() => {
  //   if (store) {
  //     localStorage.setItem("userDetails", JSON.stringify(store));
  //   }
  // }, [store]);

  return (
    <div className="parent mx-20 mt-5 flex justify-center items-center h-screen">
      <div className="main bg-white h-auto shadow-2xl p-10">
        <ToastContainer></ToastContainer>
        <h1 className="text-3xl font-bold text-center mt-10">Log-in</h1>
        <div className="mx-12 mt-5 mb-10 h-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <input
                {...register("email", { required: "Email is required" })}
                type="text"
                placeholder="Enter email"
                className="w-full p-2 border rounded"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="mb-5">
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="Password"
                className="w-full p-2 border rounded"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded"
            >
              Login
            </button>
            <div>{store}</div>
          </form>
          <p>
            create new account <Link to="/signup">signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

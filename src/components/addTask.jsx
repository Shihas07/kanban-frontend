import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTaskStatus } from "../redux/slice";
import { useNavigate } from "react-router-dom";
import Board from "./board";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
export default function AddTask() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [result, setResult] = useState("");
  const [descriptions, setDiscription] = useState("");
  const [date, setDate] = useState("");
  // const [datas, setData] = useState([]);
  const dispatch = useDispatch();
  const head = ["pending", "progress", "completed"];
  const tasks = useSelector((state) => state.tasks.value);

  const navigate=useNavigate()

  const onSubmit = (data) => {

    const token = localStorage.getItem('token');

    if (!token) {
      console.log("Token not found, redirecting to login.");
      navigate('/login');
      return;d
    }

      
    const taskWithId = {...data, id: uuidv4(), status: "pending" };
    // setData([...datas, taskWithId]);
    // console.log("shihas",datas)
    dispatch(addTask(taskWithId));
    console.log("Added Task:", taskWithId);
    setResult("");
    setDate("")
    setDiscription("")
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    console.log("abdul",draggableId);

    if (!destination) return;

    if (destination.droppableId !== source.droppableId) {
      dispatch(
        updateTaskStatus({ id: draggableId, status: destination.droppableId })
      );
    }
  };

  return (
    <div>
      <div className="flex justify-center text-center mt-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center space-x-3"
        >
          <div>
            <input
              value={result}
              className="border p-2"
              type="text"
              placeholder="Enter title"
              {...register("title", { required: "Title is required" })}
              onChange={(e) => setResult(e.target.value)}
            />
            {errors.title && (
              <span className="text-red-500 ml-1">{errors.title.message}</span>
            )}
          </div>
          <div>
            <input
              value={descriptions}
              className="border p-2"
              type="text"
              placeholder="Description"
              {...register("description", {
                required: "Description is required",
              })}
              onChange={(e) => setDiscription(e.target.value)}
            />
            {errors.description && (
              <span className="text-red-500 ml-1">
                {errors.description.message}
              </span>
            )}
          </div>
          <div>
            <input
              className="border p-2"
              value={date}
              type="date"
              {...register("date", { required: "Date is required" })}
              onChange={(e) => setDate(e.target.value)}
            />
            {errors.date && (
              <span className="text-red-500 ml-1">{errors.date.message}</span>
            )}
          </div>
          <button className="border p-2 bg-orange-800 text-white rounded-lg">
            ADD TASK
          </button>
        </form>
      </div>

      <div className="flex">
        <DragDropContext onDragEnd={onDragEnd}>
          {head.map((status) => (
            <div key={status} className="border h-60 w-1/3 bg-white mt-9 mx-3">
              <div className="border flex justify-center h-10 bg-white">
                <h1 className="text-2xl">{status}</h1>
              </div>
              <Board status={status} />
            </div>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

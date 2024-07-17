import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { deleteTask } from "../redux/slice";
import Edit from "./edit";

export default function Board({ status }) {
  const data = useSelector((state) => state.tasks.value);
  const filteredTasks = data.filter((task) => task.status === status);
  const dispatch = useDispatch();
  
  const [editingTask, setEditingTask] = useState(null);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleCloseEdit = () => {
    setEditingTask(null);
  };

  return (
    <>
      <Droppable droppableId={status}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-3 p-4 bg-slate-400 rounded"
          >
            {filteredTasks.map((task, index) => (
              <Draggable
                key={task.id.toString()}
                draggableId={task.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="p-3 bg-slate-100 flex justify-between items-center rounded shadow"
                  >
                    <div>
                      <h1>{task.title}</h1>
                      <h2>{task.description}</h2>
                      <h3>{task.date}</h3>
                    </div>
                    <button className="text-2xl" onClick={() => handleEdit(task)}><CiEdit /></button>
                    <button className="text-2xl" onClick={() => handleDelete(task.id)}><MdDelete /></button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {editingTask && <Edit task={editingTask} onClose={handleCloseEdit} />}
    </>
  );
}

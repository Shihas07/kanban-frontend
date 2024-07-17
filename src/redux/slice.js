import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.value.push(action.payload);
    },
    updateTaskStatus: (state, action) => {
      const { id, status } = action.payload;
      const task = state.value.find((task) => task.id === id);
      if (task) {
        task.status = status;
      }
    },
    deleteTask: (state, action) => {
      state.value = state.value.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action) => {
      const { id, title, description, date } = action.payload;
      const task = state.value.find((task) => task.id === id);
      if (task) {
        task.title = title;
        task.description = description;
        task.date = date;
      }
    }
  },
});

export const { addTask, updateTaskStatus, deleteTask, updateTask } = tasksSlice.actions;

export default tasksSlice.reducer;

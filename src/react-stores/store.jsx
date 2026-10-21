import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../store-features/todos/todoSlice";

const store = configureStore({
  reducer: {
    todoReducer: todoReducer,
  },
});

export default store;

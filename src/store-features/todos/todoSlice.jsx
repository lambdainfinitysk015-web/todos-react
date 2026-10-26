import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const production_server = import.meta.env.VITE_PRODUCTION_SERVER;
const production_base_url = import.meta.env.VITE_PRODUCTION_BASE_URL;
const local_base_url = import.meta.env.VITE_LOCAL_BASE_URL;

let base_url = "";
if (production_server == 0) {
  base_url = local_base_url;
} else if (production_server == 1) {
  base_url = production_base_url;
}

console.log("base_url : ", base_url);

export const fetchTodos = createAsyncThunk("todo/fetchTodos", async () => {
  const response = await fetch(`${base_url}/fetchTodos`);
  const result = await response.json();
  return result;
});

export const addTodo = createAsyncThunk(
  "todo/addTodo",
  async (todo, { dispatch }) => {
    const response = await fetch(`${base_url}/addTodo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    const result = await response.json();
    if (result.status == "success") {
      dispatch(fetchTodos());
    }
    return result;
  },
);

export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (todo, { dispatch }) => {
    const response = await fetch(`${base_url}/deleteTodo`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    const result = await response.json();
    if (result.status == "success") {
      dispatch(fetchTodos());
    }
    return result;
  },
);

export const completedTodo = createAsyncThunk(
  "todo/completedTodo",
  async (todo, { dispatch }) => {
    const response = await fetch(`${base_url}/completedTodo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    const result = await response.json();
    if (result.status == "success") {
      dispatch(fetchTodos());
    }
    return result;
  },
);

const todoReducer = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    dialog: false,
    deleteInfo: null,
    linearProgressLoader: false,
  },

  reducers: {
    openDialog(state) {
      state.dialog = true;
    },
    closeDialog(state) {
      state.dialog = false;
    },
    setDeleteInfo(state, action) {
      state.deleteInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchTodos.pending, (state, action) => {
        console.log("fetchTodos pending", action);
        state.linearProgressLoader = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        console.log("fetchTodos fulfilled", action);
        state.todos = action.payload.data;
        state.linearProgressLoader = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        console.log("fetchTodos rejected", action);
        state.linearProgressLoader = false;
      })

      // Add Todo
      .addCase(addTodo.pending, (state, action) => {
        console.log("addTodo pending", action);
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        console.log("addTodo fulfilled", action);
      })
      .addCase(addTodo.rejected, (state, action) => {
        console.log("addTodo rejected", action);
      })

      // Delete Todo
      .addCase(deleteTodo.pending, (state, action) => {
        console.log("deleteTodo pending", action);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        console.log("deleteTodo fulfilled", action);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        console.log("deleteTodo rejected", action);
      })

      // Completed Todo
      .addCase(completedTodo.pending, (state, action) => {
        console.log("completedTodo pending", action);
      })
      .addCase(completedTodo.fulfilled, (state, action) => {
        console.log("completedTodo fulfilled", action);
      })
      .addCase(completedTodo.rejected, (state, action) => {
        console.log("completedTodo rejected", action);
      });
  },
});

export const { openDialog, closeDialog, setDeleteInfo } = todoReducer.actions;
export default todoReducer.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("todo/fetchUsers", async (count) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users?_limit=${count}`,
  );
  const result = await response.json();
  return result;
});

const todoReducer = createSlice({
  name: "todo",
  initialState: {
    users: [],
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchUsers.pending, (state, action) => {
        console.log("fetchUsers pending", action.payload);
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        console.log("fetchUsers fulfilled", action.payload);
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        console.log("fetchUsers rejected", action.payload);
      });
  },
});

export default todoReducer.reducer;

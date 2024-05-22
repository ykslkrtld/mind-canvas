import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  comments: [],
  categories: [],
  users: [],
  loading: false,
  error: false,
};

const blogSlice = createSlice({
  name: "getBlog",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getBlogSuccess: (state, { payload }) => {
      state.loading = false;
      state[payload.endpoint] = payload.data;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    },
  },
);

export const { fetchStart, getBlogSuccess, fetchFail } =
blogSlice.actions;

export default blogSlice.reducer;

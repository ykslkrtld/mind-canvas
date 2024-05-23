import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  comments: [],
  categories: [],
  users: [],
  singleBlog: [],
  loading: false,
  error: false,
  totalPages: 0,
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
      state.blogs = payload.data;
      state.totalPages = payload.details.pages.total;
    },
    getSingleBlogSuccess: (state, { payload }) => {
      state.loading = false;
      state.singleBlog = payload.data;
    },
    getUserSuccess: (state, { payload }) => {
      state.loading = false;
      state.users = payload.data;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    },
  },
);

export const { fetchStart, getBlogSuccess, getUserSuccess, fetchFail, getSingleBlogSuccess } =
blogSlice.actions;

export default blogSlice.reducer;

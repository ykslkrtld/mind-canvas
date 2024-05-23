import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  comments: [],
  categories: [],
  users: [],
  loading: false,
  error: false,
  totalPages: 0,
  currentPage: 1,
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
      state.currentPage = payload.details.pages.current;
    },
    getUserSuccess: (state, { payload }) => {
      state.loading = false;
      state.users = payload.data;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    },
  },
);

export const { fetchStart, getBlogSuccess, getUserSuccess, fetchFail, setCurrentPage } =
blogSlice.actions;

export default blogSlice.reducer;

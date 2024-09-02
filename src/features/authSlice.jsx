import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    image: "",
    city: "",
    bio: "",
    userId:"",
    isAdmin:"",
  },
  token: "",
  loading: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.user.username = payload.user.username;
      state.user.email = payload.user.email;
      state.user.firstName = payload.user.firstName;
      state.user.lastName = payload.user.lastName;
      state.user.userId = payload.user._id;
      state.user.image = payload.user.image;
      state.user.city = payload.user.city;
      state.user.bio = payload.user.bio;
      state.user.isAdmin = payload.user.isAdmin;
      state.token = payload.token;
      state.error = false;
    },
    registerSuccess: (state, { payload }) => {
      state.loading = false;
      state.user.username = payload.data.username;
      state.user.email = payload.data.email;
      state.user.firstName = payload.data.firstName;
      state.user.lastName = payload.data.lastName;
      state.user.userId = payload.data._id;
      state.user.image = payload.data.image;
      state.user.city = payload.data.city;
      state.user.bio = payload.data.bio;
      state.token = payload.token;
      state.error = false;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.user = {
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        image: "",
        city: "",
        bio: "",
        userId:"",
      };
      state.token = "";
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  loginSuccess,
  fetchFail,
  registerSuccess,
  logoutSuccess,
} = authSlice.actions;
export default authSlice.reducer;

import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { fetchFail, fetchStart, loginSuccess, registerSuccess, logoutSuccess } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAxios from "./useAxios";

const useAuthCalls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {axiosToken, axiosPublic} = useAxios()

   const login = async (userData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.post("/auth/login/", userData)
      dispatch(loginSuccess(data));
      console.log(data)
      toastSuccessNotify("You have successfully logged in.");
      navigate(-1)
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Failed to log in.");
      console.log(error);
    }
  }

  const register = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.post("/users/", userInfo)
      dispatch(registerSuccess(data));
      toastSuccessNotify("You have successfully registered.");
      navigate("/")
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Failed to register.");
      console.log(error);
    }
  }


  const logout = async () => {
    dispatch(fetchStart());
    try {
      await axiosToken("/auth/logout")
      dispatch(logoutSuccess());
      toastSuccessNotify("You have successfully logged out."); 
      navigate("/")
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Failed to log out.");
      console.log(error);
    }
  }


  return {login, register, logout }
}

export default useAuthCalls



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
      toastSuccessNotify("Giriş başarılı");
      navigate("/")
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Giriş işlemi başarısız");
      console.log(error);
    }
  }

  const register = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.post("/users/", userInfo)
      dispatch(registerSuccess(data));
      toastSuccessNotify("Kayıt başarılı");
      navigate("/")
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Kayıt işlemi başarısız");
      console.log(error);
    }
  }


  const logout = async () => {
    dispatch(fetchStart());
    try {
      await axiosToken("/auth/logout")
      dispatch(logoutSuccess());
      toastSuccessNotify("Çıkış başarılı"); 
      navigate("/")
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Giriş başarısız oldu");
      console.log(error);
    }
  }


  return {login, register, logout }
}

export default useAuthCalls



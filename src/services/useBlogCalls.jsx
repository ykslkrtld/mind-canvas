import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import {
  fetchFail,
  fetchStart,
  getBlogSuccess,
  getMyBlogSuccess,
  getSingleBlogSuccess,
  getSingleUserSuccess,
  getCategoriesSuccess,
  getLikeSuccess,
} from "../features/blogSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";

const useBlogCalls = () => {
  const { axiosToken } = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const getBlogs = async (page = 1) => {
    dispatch(fetchStart());
    try {
      const res = await axiosToken(`/blogs?limit=6&sort[createdAt]=desc&page=${page}`);
      dispatch(getBlogSuccess(res.data));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const getMyBlogs = async (id) => {
    dispatch(fetchStart());
    try {
      const res = await axiosToken(`/blogs?author=${id}`);
      dispatch(getMyBlogSuccess(res.data));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const getSingleBlog = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken(`/blogs/${id}`);
      dispatch(getSingleBlogSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const getSingleUser = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken(`/users/${id}`);
      dispatch(getSingleUserSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const getCategories = async () => {
    dispatch(fetchStart());
    try {
      const {data: { data }} = await axiosToken(`/categories`);
      dispatch(getCategoriesSuccess({data}));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const postLikes = async (id) => {
    try {
      const { data } = await axiosToken.post(`/blogs/${id}/postLike`, {});
      dispatch(getLikeSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };

  const postDatas = async (endpoint, datas) => {
    dispatch(fetchStart());
    try {
      if(endpoint === "blogs") {
        const {data} = await axiosToken.post(`/${endpoint}/`, datas);
        navigate(`/detail/${data.data._id}`)
      } else{
        await axiosToken.post(`/${endpoint}/`, datas);
      }
      toastSuccessNotify("Addition was successful.");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Addition failed.");
      console.log(error);
    }
  };

  const patchBlogs = async (data, id) => {
    dispatch(fetchStart());
    try {
      await axiosToken.patch(`/blogs/${id}`, data);
      toastSuccessNotify("Editing was successful.");
      getSingleBlog(id);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Editing failed.");
      console.log(error);
    }
  };

  const patchProfile = async (data, id) => {
    dispatch(fetchStart());
    try {
      await axiosToken.patch(`/users/${id}`, data);
      toastSuccessNotify("Editing was successful.");
      getSingleUser(id)
      navigate("/profile")
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Editing failed.");
      console.log(error);
    }
  };

  const delDatas = async (endpoint, id) => {
    dispatch(fetchStart());
    try {
      await axiosToken.delete(`/${endpoint}/${id}`);
      toastSuccessNotify("Deletion was successful.");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Deletion failed.");
      console.log(error);
    }
  };

  return {
    getBlogs,
    getMyBlogs,
    getSingleBlog,
    getSingleUser,
    getCategories,
    postLikes,
    postDatas,
    patchBlogs,
    patchProfile,
    delDatas,
  };
};

export default useBlogCalls;

import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import {
  fetchFail,
  fetchStart,
  getBlogSuccess,
  getMyBlogSuccess,
  getSingleBlogSuccess,
  getUseCatSuccess,
  getLikeSuccess,
} from "../features/blogSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useBlogCalls = () => {
  const { axiosToken } = useAxios();
  const dispatch = useDispatch();

  const getBlogs = async (page = 1) => {
    dispatch(fetchStart());
    try {
      const res = await axiosToken(`/blogs?limit=6&page=${page}`);
      console.log(res);
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
      console.log(res);
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
      console.log(data);
      dispatch(getSingleBlogSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const getUseCat = async (endpoint) => {
    dispatch(fetchStart());
    try {
      const {data: { data }} = await axiosToken(`/${endpoint}`);
      dispatch(getUseCatSuccess({data, endpoint}));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const postLikes = async (id) => {
    try {
      const { data } = await axiosToken.post(`/blogs/${id}/postLike`, {});
      dispatch(getLikeSuccess(data));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const postDatas = async (endpoint, datas) => {
    dispatch(fetchStart());
    try {
      await axiosToken.post(`/${endpoint}/`, datas);
      toastSuccessNotify("Addition was successful.");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Addition failed.");
      console.log(error);
    }
  };

  const patchBlogs = async (datas, id) => {
    dispatch(fetchStart());
    try {
      await axiosToken.patch(`/blogs/${id}`, datas);
      toastSuccessNotify("Editing was successful.");
      getSingleBlog(id);
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
    getUseCat,
    postLikes,
    postDatas,
    patchBlogs,
    delDatas,
  };
};

export default useBlogCalls;

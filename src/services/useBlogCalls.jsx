import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import {
  fetchFail,
  fetchStart,
  getBlogSuccess,
  getUserSuccess,
  getSingleBlogSuccess,
  getLikeSuccess,
  getCategorySuccess,
  getMyBlogSuccess,
  getCommentSuccess
} from "../features/blogSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";

const useBlogCalls = () => {
  const { axiosToken } = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const getUsers = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken(`/users`);
      dispatch(getUserSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const getComments = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken(`/comments/?limit=100`);
      dispatch(getCommentSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const getCategories = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken(`/categories`);
      dispatch(getCategorySuccess(data));
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

  const delDatas = async (endpoint, id) => {
    dispatch(fetchStart());
    try {
      await axiosToken.delete(`/${endpoint}/${id}`);
      toastSuccessNotify("Silme işlemi başarılı");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Silme işlemi başarısız oldu");
      console.log(error);
    }
  };

  const postBlogs = async (datas) => {
    dispatch(fetchStart());
    try {
      await axiosToken.post(`/blogs/`, datas);
      toastSuccessNotify("Ekleme işlemi başarılı");
      // getBlogs()
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Ekleme işlemi başarısız oldu");
      console.log(error);
    }
  };

  const postComments = async (datas) => {
    dispatch(fetchStart());
    try {
      await axiosToken.post(`/comments/`, datas);
      toastSuccessNotify("Ekleme işlemi başarılı");
      getComments()
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Ekleme işlemi başarısız oldu");
      console.log(error);
    }
  };

  

  const patchBlogs = async (datas, id) => {
    dispatch(fetchStart());
    try {
      await axiosToken.patch(`/blogs/${id}`, datas);
      toastSuccessNotify("Düzenleme işlemi başarılı");
      getSingleBlog(id);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Düzenleme işlemi başarısız oldu");
      console.log(error);
    }
  };

  return {
    getBlogs,
    postBlogs,
    patchBlogs,
    getUsers,
    postLikes,
    getSingleBlog,
    getCategories,
    getMyBlogs,
    getComments,
    postComments,
    delDatas,
  };
};

export default useBlogCalls;

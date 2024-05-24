import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import {
  fetchFail,
  fetchStart,
  getBlogSuccess,
  getUserSuccess,
  getSingleBlogSuccess,
  getLikeSuccess,
  getCategorySuccess
  
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
      const res = await axiosToken(`/blogs?limit=3&page=${page}`);
      console.log(res)
      dispatch(getBlogSuccess(res.data));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const getSingleBlog = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken(`/blogs/${id}`);
      console.log(data)
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
      dispatch(getUserSuccess( data ));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const postLikes = async (id, currentPage)=> {
    dispatch(fetchStart())
    try {
        await axiosToken.post(`/blogs/${id}/postLike`, {})
        getBlogs(currentPage)
        // getLikes(id)
    } catch (error) {
        console.log(error)
    }
}

const getLikes = async (id) => {
  dispatch(fetchStart());
  try {
    const {data} = await axiosToken(`/blogs/${id}/getLike`);
    console.log(data)
    dispatch(getLikeSuccess( data ));
  } catch (error) {
    dispatch(fetchFail());
    console.log(error);
  }
};

  const delBlogs = async (id) => {
    dispatch(fetchStart());
    try {
      await axiosToken.delete(`/blogs/${id}`);
      toastSuccessNotify("Silme işlemi başarılı");
      getBlogs()
      navigate("/")
      
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Silme işlemi başarısız oldu");
      console.log(error);
    }
  };

  const postBlogs = async ( datas) => {
    dispatch(fetchStart());
    try {
      await axiosToken.post(`/blogs/`, datas);
      toastSuccessNotify("Ekleme işlemi başarılı");
      getBlogs()
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Ekleme işlemi başarısız oldu");
      console.log(error);
    }
  };

  const getCategories = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken(`/categories`);
      dispatch(getCategorySuccess( data ));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const patchBlogs = async (endpoint, datas, id) => {
    dispatch(fetchStart());
    try {
      await axiosToken.patch(`/${endpoint}/${id}`, datas);
      toastSuccessNotify("Düzenleme işlemi başarılı");
      getBlogs(endpoint)
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Düzenleme işlemi başarısız oldu");
      console.log(error);
    }
  };

  return { getBlogs, delBlogs, postBlogs, patchBlogs, getUsers, postLikes, getSingleBlog, getLikes, getCategories };
};

export default useBlogCalls;

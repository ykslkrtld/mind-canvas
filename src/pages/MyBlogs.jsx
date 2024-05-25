import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import MyBlogCard from '../components/blog/MyBlogCard';
import useBlogCalls from '../services/useBlogCalls';

const MyBlog = () => {

  const { blogs, users,  } = useSelector((state) => state.getBlog);
  const { getUsers, getMyBlogs } = useBlogCalls();

  console.log(users)
  console.log(blogs)

  useEffect(() => {
    if (users && users.length > 0) {
      getMyBlogs(users[0]._id);
    }
    getUsers();
  }, [users]);

  return (
    <Grid container gap={2} mt={3} mb={12} justifyContent={"center"}>
      {blogs
        .filter((blog) => blog?.userId === users[0]?._id )
        .map((blog) => (
          <Grid item key={blog._id}>
            <MyBlogCard blog={blog} />
          </Grid>
        ))}
    </Grid>
  )
}

export default MyBlog
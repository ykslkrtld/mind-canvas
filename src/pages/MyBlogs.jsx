import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MyBlogCard from '../components/blog/MyBlogCard';
import useBlogCalls from '../services/useBlogCalls';
import { setDelNav } from '../features/blogSlice';

const MyBlog = () => {

  const { blogs  } = useSelector((state) => state.getBlog);
  const { user  } = useSelector((state) => state.auth);
  const { getMyBlogs } = useBlogCalls();
  const [ publish, setPublish ] = useState(true)
  const dispatch = useDispatch();


  useEffect(() => {
    if (user.username) {
      getMyBlogs(user?.userId);
    }
    dispatch(setDelNav(true))
  }, []);

  return (
    <>
    <Box display={"flex"} justifyContent={"center"} gap={3} my={"3rem"}>
      <Button onClick={() => setPublish(false)} variant='contained' color={publish ? 'inherit' : 'error'} >Draft</Button>
      <Button onClick={() => setPublish(true)} variant='contained' color={publish ? 'success' : 'inherit'}>Published</Button>
    </Box>

    {blogs.length === 0 && <Typography variant='h5' textAlign={"center"} color={"red"}>Sorry, You do not have a blog</Typography>}
    <Grid container gap={2} mt={3} justifyContent={"center"}>
      {blogs
        .filter((blog) => blog?.userId === user?.userId && blog?.isPublish === false )
        .map((blog) => (
          !publish &&
          <Grid item key={blog._id}>
            <MyBlogCard blog={blog} />
          </Grid>
        ))}
    </Grid>
    <Grid container gap={2} mt={3} justifyContent={"center"}>
      {blogs
        .filter((blog) => blog?.userId === user?.userId && blog?.isPublish )
        .map((blog) => (
          publish && 
          <Grid item key={blog._id}>
            <MyBlogCard blog={blog} />
          </Grid>
        ))}
    </Grid>
    <div style={{ paddingBottom: '100px' }}></div>
    </>
  )
}

export default MyBlog
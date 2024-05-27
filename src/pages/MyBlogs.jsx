import { Box, Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import MyBlogCard from '../components/blog/MyBlogCard';
import useBlogCalls from '../services/useBlogCalls';

const MyBlog = () => {

  const { blogs, users,  } = useSelector((state) => state.getBlog);
  const { getUsers, getMyBlogs } = useBlogCalls();
  const [ publish, setPublish ] = useState(true)

  console.log(users)
  console.log(blogs)

  useEffect(() => {
    if (users && users.length > 0) {
      getMyBlogs(users[0]._id);
    }
    getUsers();
  }, [users]);

  return (
    <>
    <Box display={"flex"} justifyContent={"center"} gap={3} my={"3rem"}>
      <Button onClick={() => setPublish(false)} variant='contained' color={publish ? 'inherit' : 'error'} >Draft</Button>
      <Button onClick={() => setPublish(true)} variant='contained' color={publish ? 'success' : 'inherit'}>Published</Button>
    </Box>

    <Grid container gap={2} mt={3} justifyContent={"center"}>
      {blogs
        .filter((blog) => blog?.userId === users[0]?._id && blog?.isPublish === false )
        .map((blog) => (
          !publish &&
          <Grid item key={blog._id}>
            <MyBlogCard blog={blog} />
          </Grid>
        ))}
    </Grid>
    <Grid container gap={2} mt={3} justifyContent={"center"}>
      {blogs
        .filter((blog) => blog?.userId === users[0]?._id && blog?.isPublish )
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
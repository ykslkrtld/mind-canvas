import React, { useEffect } from 'react'
import Card from '../components/blog/Card'
import { useSelector } from 'react-redux';
import useBlogCalls from '../services/useBlogCalls';
import { Grid } from '@mui/material';

const Dashboard = () => {

  const { blogs, users } = useSelector((state) => state.getBlog);
  const { getBlogs } = useBlogCalls()

  useEffect(() => {
    getBlogs("blogs")
    getBlogs("users")
  }, [])
console.log(blogs)
  return (
    <Grid container gap={2} mt={3} justifyContent={"center"}>
          {blogs.map((blog) => (
            <Grid item key={blog._id}>
              <Card blog={blog} users={users} />
            </Grid>
          ))}
        </Grid>
  )
}

export default Dashboard
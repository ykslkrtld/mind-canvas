import React, { useEffect } from 'react'
import Card from '../components/blog/Card'
import { useSelector } from 'react-redux';
import useBlogCalls from '../services/useBlogCalls';
import { Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Dashboard = () => {

  const { blogs } = useSelector((state) => state.getBlog);
  const { getBlogs } = useBlogCalls()

  useEffect(() => {
    getBlogs("blogs")
    getBlogs("users")
  }, [])

  return (
    <>
      <Grid container gap={2} mt={3} justifyContent={"center"}>
        {blogs.map((blog) => (
          <Grid item key={blog._id}>
            <Card blog={blog} />
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2} mt={3} >
        <Pagination sx={{display:"flex", justifyContent:"center"}} count={10} variant="outlined" />
      </Stack>
    </>
  )
}

export default Dashboard
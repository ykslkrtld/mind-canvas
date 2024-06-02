import React, { useEffect } from 'react'
import BlogCard from '../components/blog/BlogCard'
import { useSelector, useDispatch } from 'react-redux';
import useBlogCalls from '../services/useBlogCalls';
import { Box, Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { setCurrentPage, setDelNav } from '../features/blogSlice';

const Dashboard = () => {

  const { blogs, totalPages, currentPage } = useSelector((state) => state.getBlog);
  const { getBlogs } = useBlogCalls();
  const dispatch = useDispatch();

  useEffect(() => {
    getBlogs(currentPage);
  }, [currentPage]);

  useEffect(() => {
    dispatch(setDelNav(true))
  }, [])
  

  const handlePageChange = (event, value) => {
    dispatch(setCurrentPage(value));  
  };

  return (
    <>
    <Box mt={3}></Box>
      <Grid container gap={2} justifyContent={"center"} maxWidth={"1500px"} margin={"auto"}>
        {blogs.map((blog) => (
          <Grid item key={blog._id}>
            <BlogCard blog={blog} currentPage={currentPage} />
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2} mt={3} >
        <Pagination 
          sx={{display:"flex", justifyContent:"center"}} 
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined" />
      </Stack>
      <div style={{ paddingBottom: '100px' }}></div>
    </>
  )
}

export default Dashboard
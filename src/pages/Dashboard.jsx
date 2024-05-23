import React, { useEffect } from 'react'
import Card from '../components/blog/Card'
import { useDispatch, useSelector } from 'react-redux';
import useBlogCalls from '../services/useBlogCalls';
import { Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { setCurrentPage } from '../features/blogSlice';

const Dashboard = () => {

  const dispatch = useDispatch();
  const { blogs, totalPages, currentPage } = useSelector((state) => state.getBlog);
  const { getBlogs, getUsers } = useBlogCalls();

  useEffect(() => {
    getBlogs(currentPage);
    getUsers();
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    dispatch(setCurrentPage(value));
  };

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
        <Pagination 
          sx={{display:"flex", justifyContent:"center"}} 
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined" />
      </Stack>
    </>
  )
}

export default Dashboard
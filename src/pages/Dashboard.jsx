import React, { useEffect, useState } from 'react'
import Card from '../components/blog/Card'
import { useSelector } from 'react-redux';
import useBlogCalls from '../services/useBlogCalls';
import { Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Dashboard = () => {

  const { blogs, totalPages } = useSelector((state) => state.getBlog);
  const { getBlogs, getUsers } = useBlogCalls();
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    getBlogs(currentPage);
    getUsers();
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Grid container gap={2} mt={3} justifyContent={"center"}>
        {blogs.map((blog) => (
          <Grid item key={blog._id}>
            <Card blog={blog} currentPage={currentPage} />
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
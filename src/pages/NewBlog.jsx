import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import useBlogCalls from '../services/useBlogCalls'
import { useEffect } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'

const NewBlog = () => {
  const {getUsers, getCategories, postBlogs} = useBlogCalls()

  const status = [{
    name:"Draft",
    states: false
  },
    {
     name: "Published",
     states: true 
    }]
  const { categories } = useSelector((state) => state.getBlog);

  const [blogInfo, setBlogInfo] = useState({
    categoryId: "",
    title: "",
    content: "",
    image: "",
    isPublish: "",
  });

  const handleChange = (e) => {
    setBlogInfo({ ...blogInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postBlogs( blogInfo );
    setBlogInfo({
      categoryId: "",
      title: "",
      content: "",
      image: "",
      isPublish: "",
    });
  };

  useEffect(() => {
    getUsers()
    getCategories()
  }, [])
  
  return (
          <Box
          sx={{width:"50%", margin:"auto", my:"5rem"}}
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            gap="1rem"
          >
            <Typography display={"flex"} justifyContent={"center"} variant='h4' marginBottom={"2rem"}>
              NEW BLOG
            </Typography>
            <TextField
              id="title"
              name="title"
              label="Title"
              variant="outlined"
              value={blogInfo.title}
              onChange={handleChange}
              required
            />
            <TextField
              id="image"
              name="image"
              label="Image URL"
              variant="outlined"
              value={blogInfo.image}
              onChange={handleChange}
              required
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                name="categoryId"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={blogInfo.categoryId}
                label="Category"
                onChange={handleChange}
                required
              >
                {categories?.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                name="isPublish"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={blogInfo.isPublish}
                label="Brand"
                onChange={handleChange}
                required
              >
                {status?.map((statu, index) => (
                  <MenuItem key={index} value={statu.states}>
                    {statu.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              id="content"
              name="content"
              label="Content"
              variant="outlined"
              value={blogInfo.content}
              onChange={handleChange}
              required
            />
            <Button variant="contained" type="submit">
              NEW BLOG
            </Button>
          </Box>
  )
}

export default NewBlog
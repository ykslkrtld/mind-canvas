import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useBlogCalls from "../services/useBlogCalls";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { setDelNav } from '../features/blogSlice';


const NewBlog = () => {
  const { getCategories, postDatas } = useBlogCalls();
  const dispatch = useDispatch();


  const status = [
    {
      name: "Draft",
      states: false,
    },
    {
      name: "Published",
      states: true,
    },
  ];
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
    postDatas("blogs", blogInfo);
    setBlogInfo({
      categoryId: "",
      title: "",
      content: "",
      image: "",
      isPublish: "",
    });
  };

  useEffect(() => {
    getCategories();
    dispatch(setDelNav(false))
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          marginTop: "3rem",
          width: 320,
          bgcolor: "background.paper",
          borderRadius: "2rem",
          boxShadow: 24,
          p: 3,
        }}
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap="1rem"
      >
        <Typography
          display={"flex"}
          justifyContent={"center"}
          variant="h4"
          marginBottom={"1rem"}
        >
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
          fullWidth
        />
        <TextField
          id="image"
          name="image"
          label="Image URL"
          variant="outlined"
          value={blogInfo.image}
          onChange={handleChange}
          required
          fullWidth
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
            fullWidth
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
            fullWidth
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
          multiline
          rows={2}
          fullWidth
        />
        <Button variant="contained" type="submit" color="secondary" fullWidth>
          NEW BLOG
        </Button>
      </Box>
      <div style={{ paddingBottom: "80px" }}></div>
    </>
  );
};

export default NewBlog;

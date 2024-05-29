import { useSelector } from "react-redux";
import useBlogCalls from "../../services/useBlogCalls";
import { useState, useEffect } from "react";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const UpdateBlogModal = ({ open, setOpen, singleBlog, categoryId }) => {
  const { title, content, image, isPublish, _id } = singleBlog;
  const { categories } = useSelector((state) => state.getBlog);
  const { patchBlogs } = useBlogCalls();

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

  const [blogInfo, setBlogInfo] = useState({
    categoryId,
    title,
    content,
    image,
    isPublish,
  });


  const handleChange = (e) => {
    setBlogInfo({ ...blogInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    patchBlogs(blogInfo, _id);
    setOpen(false);
  };

  const handleClose = () => {
    setBlogInfo({
      categoryId,
      title,
      content,
      image,
      isPublish,
    });
    setOpen(false);
  };

  useEffect(() => {
    if (singleBlog, categoryId) {
      setBlogInfo({
        categoryId,
        title,
        content,
        image,
       isPublish,
      });
    }
    }, [singleBlog, categoryId]);

  return (
    <div>
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={
            {position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 360,
            bgcolor: "background.paper",
            borderRadius: "2rem",
            boxShadow: 24,
            p: 4,}
          }
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
            marginBottom={"2rem"}
          >
            UPDATE BLOG
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
            multiline
            rows={2}
          />
          <Button variant="contained" type="submit" color="secondary">
            UPDATE BLOG
          </Button>
        </Box>
      </Fade>
    </Modal>
    </div>
  );
};

export default UpdateBlogModal;

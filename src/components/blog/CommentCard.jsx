import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import useBlogCalls from "../../services/useBlogCalls";

const CommentCard = ({blogId}) => {

  const [commentInfo, setCommentInfo] = useState({
    comment: "",
    blogId,
  });
  console.log(blogId)

  const { postComments, getSingleBlog } = useBlogCalls();

  useEffect(() => {
    setCommentInfo({ ...commentInfo, blogId });
  }, [blogId]);

  const handleChange = (e) => {
    setCommentInfo({ ...commentInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    postComments(commentInfo).then(() => getSingleBlog(blogId))
  }

  return (
      <Box onSubmit={handleSubmit} width={"90%"} m={"auto"} component={"form"} >
        <TextField
          id="comment"
          name="comment"
          label="Add a comment"
          variant="outlined"
          value={commentInfo.comment}
          onChange={handleChange}
          multiline
          rows={2}
          sx={{width:"100%", my:3}}
        />
        <Button
          variant="contained"
          type="submit" 
          color="secondary"
          sx={{width:"100%"}}
        >
          ADD COMMENT
        </Button>
      </Box>
  );
};

export default CommentCard;

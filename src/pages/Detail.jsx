import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useBlogCalls from "../services/useBlogCalls";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Avatar, Button } from "@mui/material";
import loadingGif from "../assets/loadingg.gif";
import DeleteModal from "../components/blog/DeleteModal";
import UpdateModal from "../components/blog/UpdateModal";
import CommentForm from "../components/blog/CommentForm";
import CommentCard from "../components/blog/CommentCard";
import { setShowComments } from "../features/blogSlice";

const Detail = () => {
  const { id } = useParams();
  const { getSingleBlog, postLikes, getUseCat } = useBlogCalls();
  const { singleBlog, loading, users, likes, showComments } = useSelector((state) => state.getBlog);
  const [userLike, setUserLike] = useState();
  const [countOfLikes, setCountOfLikes] = useState();
  const [open, setOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const dispatch = useDispatch()

  useEffect(() => {
    getSingleBlog(id);
    getUseCat("users");
  }, [id]);

  useEffect(() => {
    setUserLike(likes?.didUserLike);
    setCountOfLikes(likes?.countOfLikes);
  }, [likes]);

  useEffect(() => {
    setUserLike(singleBlog?.likes?.includes(users[0]?._id));
    setCountOfLikes(singleBlog?.likes?.length);
  }, [singleBlog?.likes]);

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CardMedia
            component="img"
            image={loadingGif}
            sx={{
              width: "20rem",
            }}
          />
        </div>
      ) : (
        <Card
          sx={{
            width: "70%",
            height: "100%",
            margin: "auto",
            mt: "3rem",
            padding: "3rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <CardMedia
            component="img"
            height="300"
            image={singleBlog?.image}
            alt="Paella dish"
            sx={{ marginBottom: "3rem", objectFit: "contain",  }}
          />
          <CardHeader
            avatar={<Avatar aria-label="recipe"></Avatar>}
            title={singleBlog?.userId?.username}
            subheader={`${new Date(singleBlog.createdAt).toLocaleString()}`}
          />
          <CardContent>
            <Typography variant="h5" color="text.black">
              {singleBlog.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {singleBlog.content}
            </Typography>
          </CardContent>
          <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
            <CardActions>
              <IconButton
                aria-label="add to favorites"
                onClick={() => postLikes(singleBlog._id)}
              >
                <FavoriteIcon sx={{ color: userLike ? "red" : "inherit" }} />
                <Typography>{countOfLikes}</Typography>
              </IconButton>
              <IconButton aria-label="comment" onClick={() => dispatch(setShowComments(!showComments))}>
                <CommentIcon />
                <Typography>{singleBlog?.comments?.length}</Typography>
              </IconButton>
              <IconButton aria-label="visibility">
                <VisibilityIcon />
                <Typography>{singleBlog?.countOfVisitors}</Typography>
              </IconButton>
            </CardActions>
          </CardActions>
          {users[0]?._id === singleBlog?.userId?._id && (
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
              variant="contained" color="success"
                onClick={() => {
                  setOpen(true);
                  setSelectedBlog(singleBlog?._id);
                }}
              >
                UPDATE
              </Button>
              <UpdateModal
                open={open && selectedBlog === singleBlog?._id}
                setOpen={setOpen}
                singleBlog={singleBlog}
                categoryId={singleBlog?.categoryId?._id}
              />
              <DeleteModal endpoint={"blogs"} id={singleBlog?._id} />
            </CardActions>
          )}
          {showComments && singleBlog?.comments && (
            <>
              <CommentCard blogId={singleBlog?._id} />
              {singleBlog?.comments.map((comment) => (
                  <CommentForm key={comment._id} comment={comment} />
                ))}
            </>
          )}
        </Card>
      )}
      <div style={{ paddingBottom: '100px' }}></div>
    </>
  );
};

export default Detail;

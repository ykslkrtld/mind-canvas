import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useBlogCalls from "../services/useBlogCalls";
import { useSelector } from "react-redux";
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
import { Avatar } from "@mui/material";
import loadingGif from "../assets/loadingg.gif";

const Detail = () => {
  const { id } = useParams();
  const { getSingleBlog, postLikes, getUsers, getLikes } = useBlogCalls();
  const { singleBlog, loading, users } = useSelector((state) => state.getBlog);
  const { user } = useSelector((state) => state.auth);


  useEffect(() => {
    getSingleBlog(id);
  }, []);

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
            my: "3rem",
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
            sx={{ marginBottom: "3rem" }}
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
                <FavoriteIcon sx={{ color: singleBlog?.likes?.includes(users[0]?._id) ? "red" : "inherit" }}/>
                <Typography>{singleBlog?.likes?.length}</Typography>
              </IconButton>
              <IconButton aria-label="comment">
                <CommentIcon />
                <Typography>{singleBlog?.comments?.length}</Typography>
              </IconButton>
              <IconButton aria-label="visibility">
                <VisibilityIcon />
                <Typography>{singleBlog?.countOfVisitors}</Typography>
              </IconButton>
            </CardActions>
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default Detail;

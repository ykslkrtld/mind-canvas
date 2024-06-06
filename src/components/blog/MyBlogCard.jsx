import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button } from '@mui/material';
import useBlogCalls from '../../services/useBlogCalls';
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { setShowComments } from "../../features/blogSlice";

const BlogCard = ({blog}) => {

  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth);
  const { postLikes, getMyBlogs } = useBlogCalls();
  const dispatch = useDispatch()

  const handleLikes = () => {
    postLikes(blog._id).then(() => getMyBlogs(user?.userId))
  }

  const handleShowComments = () => {
      navigate(`/detail/${blog._id}`);
      dispatch(setShowComments(true));
  };

  return (
    <Card sx={{ width: 360, height: 500, display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
      <CardMedia
        component="img"
        height="200"
        image={blog?.image}
        alt="Image"
      />
      <CardHeader
        title={blog.title}
        subheader= {`Published Date: ${new Date(blog.createdAt).toLocaleString()}`}
        sx={{height:"75px", alignItems:"center"}}
      />
      <Link to={`/detail/${blog._id}`} style={{ textDecoration: 'none' }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary" sx={{height:"60px"}} >
            {(blog?.content).slice(0, 100) + "..."}
          </Typography>
        </CardContent>
      </Link>
      <CardActions disableSpacing sx={{justifyContent:"space-between", height:"50px"}}>
        <CardActions>
        <IconButton aria-label="add to favorites" onClick={handleLikes}>
        <FavoriteIcon sx={{ color: blog.likes.includes(user?.userId) ? "red" : "inherit" }} />
        <Typography>
          {blog?.likes.length}
        </Typography>
        </IconButton>
        <IconButton aria-label="comment" onClick={handleShowComments}>
          <CommentIcon />
          <Typography>
          {blog?.comments.length}
        </Typography>
        </IconButton>
        <IconButton aria-label="visibility">
          <VisibilityIcon />
          <Typography>
          {blog?.countOfVisitors}
        </Typography>
        </IconButton>
        </CardActions>
        <Link to={`/detail/${blog._id}`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color='secondary' onClick={() => dispatch(setShowComments(false))}>
            READ MORE
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
export default BlogCard

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
import { useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';


const BlogCard = ({blog, currentPage}) => {

  const navigate = useNavigate()
  const { postLikes, getBlogs } = useBlogCalls();
  const { users } = useSelector((state) => state.getBlog);
  const { user } = useSelector((state) => state.auth);
  console.log(user)

  const handleLikes = () => {
    user ? postLikes(blog._id, currentPage).then(() => getBlogs(currentPage)) : navigate("/login")
  }

  return (
    <Card sx={{ width: 360, height: 450, display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
      <CardHeader
        title={blog.title}
        subheader= {`Published Date: ${new Date(blog.createdAt).toLocaleString()}`}
      />
      <CardMedia
        component="img"
        height="194"
        image={blog?.image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" >
          {(blog.content).slice(0, 100) + "..."}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{justifyContent:"space-between"}}>
        <CardActions>
        <IconButton aria-label="add to favorites" onClick={handleLikes}>
        <FavoriteIcon sx={{ color: user && blog.likes.includes(users[0]?._id) ? "red" : "inherit" }} />
        <Typography>
          {blog?.likes.length}
        </Typography>
        </IconButton>
        <IconButton aria-label="comment">
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
          <Button variant="contained" color='secondary'>
            READ MORE
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
export default BlogCard

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


const BlogCard = ({blog}) => {

  return (
    <Card sx={{ maxWidth: 360 }}>
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
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
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
        <Button variant="contained"  >
              READ MORE
          </Button>
        
      </CardActions>
    </Card>
  );
}
export default BlogCard

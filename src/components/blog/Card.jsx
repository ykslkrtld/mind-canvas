import * as React from 'react';
// import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import avatar from "../../assets/avatar.png"
import { Button } from '@mui/material';

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

const BlogCard = ({blog, users}) => {
  // const [expanded, setExpanded] = React.useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  return (
    <Card sx={{ maxWidth: 360 }}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" src={users.find((user) => user._id === blog.userId)?.image || avatar}/>
        }
        title={blog.title}
        subheader= {new Date(blog.createdAt).toLocaleString()}
      />
      <CardMedia
        component="img"
        height="194"
        image={blog?.image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" >
          {(blog.content).slice(0, 90) + "..."}
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

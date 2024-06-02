import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CardActions from "@mui/material/CardActions";
import useBlogCalls from '../../services/useBlogCalls';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DeleteModal({endpoint, id, blogId}) {
  const [open, setOpen] = React.useState(false);
  const { delDatas, getSingleBlog } = useBlogCalls();
  const {delNav} = useSelector((state) => state.getBlog)
  const navigate = useNavigate()

  const handleDelete = () => {
    if(endpoint === "comments"){
      delDatas(endpoint, id).then(() => getSingleBlog(blogId))
    } else if(endpoint === "blogs" && delNav) {
      delDatas(endpoint, id)
      navigate(-1);
    } else if(endpoint === "blogs" && !delNav){
      delDatas(endpoint, id)
      navigate("/");
    }
  }

  return (
    <div>
      <Button variant="contained" color="error" onClick={() => setOpen(true)}>DELETE</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={"center"}>
            Do you really want to delete? This process cannot be undone!
          </Typography>
          <CardActions sx={{justifyContent:"center", gap:3, mt:3}}>
              <Button variant="contained" color="success" onClick={() => setOpen(false)}>CANCEL</Button>
              <Button variant="contained" color="error" onClick={handleDelete}>DELETE</Button>
          </CardActions>
        </Box>
      </Modal>
    </div>
  );
}

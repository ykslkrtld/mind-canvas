import { Button, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useBlogCalls from "../../services/useBlogCalls";
import { useSelector } from "react-redux";

const CommentForm = ({ comment }) => {
  const { delComments } = useBlogCalls();
  const {users} = useSelector(state => state.getBlog)
  return (
    <>
    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
      <div style={{ marginTop: "1rem", paddingLeft:"4rem", width: "50%" }}>
        <p>{comment?.userId?.username}</p>
        <p>{new Date(comment?.createdAt).toLocaleDateString()}</p>
        <p>{comment?.comment}</p>
      </div>
        {users[0]?._id === comment?.userId?._id && 
      <div>
        <Tooltip title="Delete" arrow>
          <Button
            color="error"
            onClick={() => delComments(comment._id)}
            sx={{ "&:hover": { color: "#2E7D32", cursor: "pointer" }, marginRight:"4rem" }}
          >
            <DeleteIcon />
          </Button>
        </Tooltip>
      </div>
    }
    </div>
      <hr />
      </>
  );
};

export default CommentForm;

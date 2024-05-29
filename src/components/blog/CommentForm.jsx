
import { useSelector } from "react-redux";
import DeleteModal from "./DeleteModal";

const CommentForm = ({ comment }) => {
  const {user} = useSelector(state => state.auth)

  return (
    <>
    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
      <div style={{ marginTop: "1rem", paddingLeft:"4rem", width: "50%" }}>
        <p>{comment?.userId?.username}</p>
        <p>{new Date(comment?.createdAt).toLocaleDateString()}</p>
        <p>{comment?.comment}</p>
      </div>
        {user?.userId === comment?.userId?._id && 
      <div style={{marginRight:"4rem"}}>
        <DeleteModal endpoint={"comments"} id={comment._id} blogId={comment?.blogId} />
      </div>
    }
    </div>
      <hr />
      </>
  );
};

export default CommentForm;

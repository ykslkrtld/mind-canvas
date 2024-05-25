import React from 'react'

const CommentCard = ({comment}) => {
  return (
    <div style={{marginTop:"2rem", paddingLeft:"1.5rem", width:"50%"}}>
      <p>{comment?.userId?.username}</p>
      <p>{new Date(comment?.createdAt).toLocaleDateString()}</p>
      <p>{comment?.comment}</p>
      <hr />
    </div>
  )
}

export default CommentCard
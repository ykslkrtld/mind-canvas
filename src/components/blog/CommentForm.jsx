import React from 'react'

const CommentForm = ({item}) => {
  return (
    <div style={{marginTop:"2rem", paddingLeft:"1.5rem", width:"50%"}}>
      <p>{item?.userId?.username}</p>
      <p>{new Date(item?.createdAt).toLocaleDateString()}</p>
      <p>{item?.comment}</p>
      <hr />
    </div>
  )
}

export default CommentForm
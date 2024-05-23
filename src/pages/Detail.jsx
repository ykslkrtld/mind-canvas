import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useBlogCalls from '../services/useBlogCalls'
import { useSelector } from 'react-redux'

const Detail = () => {

  const {id} = useParams()
  const { getSingleBlog } = useBlogCalls()
  const { singleBlog } = useSelector((state) => state.getBlog); 

  useEffect(() => {
    getSingleBlog(id)
  }, [])
  

  return (
    <div>
      <img src={singleBlog?.image} alt="" />
      <p>{singleBlog.title}</p>
    </div>
  )
}

export default Detail
import React from 'react'
import { useSelector } from 'react-redux'
import useBlogCalls from '../services/useBlogCalls'
import { useEffect } from 'react'

const NewBlog = () => {
  const {getBlogs} = useBlogCalls()

  useEffect(() => {
    getBlogs("users")
  }, [])
  
  return (
    <div>NewBlog</div>
  )
}

export default NewBlog
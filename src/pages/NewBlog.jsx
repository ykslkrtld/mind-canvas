import React from 'react'
import { useSelector } from 'react-redux'
import useBlogCalls from '../services/useBlogCalls'
import { useEffect } from 'react'

const NewBlog = () => {
  const {getUsers} = useBlogCalls()

  useEffect(() => {
    getUsers()
  }, [])
  
  return (
    <div>NewBlog</div>
  )
}

export default NewBlog
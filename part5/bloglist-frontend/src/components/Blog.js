import { useState } from 'react'

const Blog = ({ blog, updateLikes, username, deleteBlog }) => {
  const [showInfo, setShowInfo] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const styleForButton = () => {
    if (blog.user.username !== username) {
      return { display: 'none' }
    }
  }

  if (!showInfo) {
    return <div className='blog' style={blogStyle}>
      {blog.title} by {blog.author} <button onClick={() => setShowInfo(!showInfo)}>view</button>
    </div>
  } else {
    return <div className='blog' style={blogStyle}>
      <div>{blog.title} by {blog.author} <button onClick={() => setShowInfo(!showInfo)}>hide</button></div>
      <div>{blog.url}</div>
      <div>likes {blog.likes}<button onClick={updateLikes}>like</button></div>
      <div>{blog.user.name}</div>
      <div><button style={styleForButton()} onClick={deleteBlog}>remove</button></div>
    </div>
  }

}

export default Blog
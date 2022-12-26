import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const CreateBlog = ({ setBlogs, setMessage, setCssClassName }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [visibilityForm, setVisibilityForm] = useState(false)

  const handleNewTitle = (event) => {
    setNewTitle(event.target.value)
  }

  const handleNewAuthor = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleNewUrl = (event) => {
    setNewUrl(event.target.value)
  }

  const addNewBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    const newSavedBlog = await blogService.create(newBlog)
    const allBlogs = await blogService.getAll()
    setBlogs(allBlogs)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    setMessage(`a new blog ${newSavedBlog.title} by ${newSavedBlog.author} added`)
    setCssClassName('successful')
    toggleVisibility()
    setTimeout(() => {
      setMessage(null)
      setCssClassName(null)
    }, 5000)
  }

  const toggleVisibility = () => {
    setVisibilityForm(!visibilityForm)
    if (!visibilityForm) {
      setNewAuthor('')
      setNewTitle('')
      setNewUrl('')
    }
  }

  if (!visibilityForm) {
    return <button onClick={toggleVisibility}>new note</button>
  } else {
    return <form onSubmit={addNewBlog}>
      <h2>create new</h2>
      <div>title: <input value={newTitle} onChange={handleNewTitle} /></div>
      <div>author: <input value={newAuthor} onChange={handleNewAuthor} /></div>
      <div>url: <input value={newUrl} onChange={handleNewUrl} /></div>
      <div>
        <button type='submit'>create</button>
      </div>
      <div>
        <button type='button' onClick={toggleVisibility}>cancel</button>
      </div>

    </form>
  }
}

CreateBlog.propTypes = {
  setBlogs: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setCssClassName: PropTypes.func.isRequired
}

export default CreateBlog
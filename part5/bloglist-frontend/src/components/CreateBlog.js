import { useState, } from 'react'
import PropTypes from 'prop-types'

const CreateBlog = ({ addNewBlog }) => {
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

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    toggleVisibility()
    addNewBlog(newBlog)
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
    return <button onClick={toggleVisibility} id='new-note'>new note</button>
  } else {
    return <form onSubmit={addBlog}>
      <h2>create new</h2>
      <div>title: <input id='title' value={newTitle} onChange={handleNewTitle} placeholder='title'/></div>
      <div>author: <input id='author' value={newAuthor} onChange={handleNewAuthor} placeholder='author'/></div>
      <div>url: <input id='url' value={newUrl} onChange={handleNewUrl} placeholder='url'/></div>
      <div>
        <button type='submit' id='create-blog'>create</button>
      </div>
      <div>
        <button type='button' onClick={toggleVisibility}>cancel</button>
      </div>

    </form>
  }
}

CreateBlog.propTypes = {
  addNewBlog: PropTypes.func.isRequired,
}

export default CreateBlog
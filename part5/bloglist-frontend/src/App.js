import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)
  const [cssClassName, setCssClassName] = useState(null)

  const setAndSortBlogs = (blogs) => {
    blogs.sort((a, b) => b.likes - a.likes)
    setBlogs(blogs)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setAndSortBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setUsername('')
      setPassword('')
      setMessage('wrong username or password')
      setCssClassName('error')
      setTimeout(() => {
        setMessage(null)
        setCssClassName(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
    setMessage(`goodbye ${user.name}`)
    setCssClassName('successful')
    setTimeout(() => {
      setMessage(null)
      setCssClassName(null)
    }, 5000)
  }

  const addNewBlog = async (newBlog) => {
    const newSavedBlog = await blogService.create(newBlog)
    const allBlogs = await blogService.getAll()
    setAndSortBlogs(allBlogs)
    setMessage(`a new blog ${newSavedBlog.title} by ${newSavedBlog.author} added`)
    setCssClassName('successful')
    setTimeout(() => {
      setMessage(null)
      setCssClassName(null)
    }, 5000)
  }

  const updateLikes = async (blog) => {
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    await blogService.update(blog.id, updatedBlog)

    const allBlogs = await blogService.getAll()
    setAndSortBlogs(allBlogs)
    setMessage(`blog ${blog.title} by ${blog.author} liked`)
    setCssClassName('successful')
    setTimeout(() => {
      setMessage(null)
      setCssClassName(null)
    }, 2000)
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)) {
      await blogService.deleteBlog(blog.id)

      const allBlogs = await blogService.getAll()
      setAndSortBlogs(allBlogs)
      setMessage(`blog ${blog.title} by ${blog.author} has been successfully removed`)
      setCssClassName('successful')
      setTimeout(() => {
        setMessage(null)
        setCssClassName(null)
      },5000)
    }
  }


  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification message={message} cssClassName={cssClassName} />
      <form onSubmit={handleLogin} id='login-form'>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </div>
  )
  return (
    <div>
      {user === null
        ? loginForm()
        : <Blogs blogs={blogs} name={user.name} handleLogout={handleLogout} message={message}
          cssClassName={cssClassName} addNewBlog={addNewBlog} updateLikes={updateLikes}
          username={user.username} deleteBlog={deleteBlog} />}
    </div>
  )
}

const Blogs = (props) => {
  return <div>
    <h2>blogs</h2>
    <Notification message={props.message} cssClassName={props.cssClassName} />
    <p>{props.name} logged in <button id='logout' onClick={props.handleLogout}>logout</button></p>
    <CreateBlog addNewBlog={props.addNewBlog} />
    {props.blogs.map(blog =>
      <Blog className='blog' key={blog.id} blog={blog} updateLikes={() => props.updateLikes(blog)} username={props.username} deleteBlog={() => props.deleteBlog(blog)} />)
    }
  </div>
}

const Notification = ({ message, cssClassName }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={cssClassName}>
      {message}
    </div>
  )
}

export default App
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const {MONGODB_URI} = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')


mongoose.connect(MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
  }

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
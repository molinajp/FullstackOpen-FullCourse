import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlog from './CreateBlog'

test('clicking the button twice calls event handler twice', async () => {
  const newBlog = {
    title: 'Title for test',
    author: 'Author for test',
    url: 'Url for test'
  }

  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<CreateBlog addNewBlog={createBlog} />)

  const button = screen.getByText('new note')
  await user.click(button)

  const inputTitle = screen.getByPlaceholderText('title')
  const inputAuthor = screen.getByPlaceholderText('author')
  const inputUrl = screen.getByPlaceholderText('url')
  const sendButton = screen.getByText('create')

  await user.type(inputTitle, `${newBlog.title}`)
  await user.type(inputAuthor, `${newBlog.author}`)
  await user.type(inputUrl, `${newBlog.url}`)
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual(newBlog)
})
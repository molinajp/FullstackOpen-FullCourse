import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content correctly', () => {
  const blog = {
    title: 'It renders everything',
    author: 'Test',
    likes: 10,
    url: 'test.com',
    user: {
      username: 'test',
      name: 'Test Test'
    }
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText(`${blog.title} by ${blog.author}`)
  const elementByLikes = () => screen.getByText(`likes ${blog.likes}`)
  const elementByName = () => screen.getByText(`${blog.url}`)
  expect(element).toBeDefined()
  expect(elementByLikes).toThrowError()
  expect(elementByName).toThrowError()
})

test('clicking button shows info for blog', async () => {
  const blog = {
    title: 'It renders everything',
    author: 'Test',
    likes: 10,
    url: 'test.com',
    user: {
      username: 'test',
      name: 'Test Test'
    }
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const elementByTitle =  screen.getByText(`${blog.title} by ${blog.author}`)
  const elementByLikes = screen.getByText(`likes ${blog.likes}`)
  const elementByName = screen.getByText(`${blog.url}`)

  expect(elementByTitle).toBeDefined()
  expect(elementByLikes).toBeDefined()
  expect(elementByName).toBeDefined()
})

test('clicking the button twice calls event handler twice', async () => {
  const blog = {
    title: 'It renders everything',
    author: 'Test',
    likes: 10,
    url: 'test.com',
    user: {
      username: 'test',
      name: 'Test Test'
    }
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} updateLikes={mockHandler} />)

  const user = userEvent.setup()
  const buttonForView = screen.getByText('view')
  await user.click(buttonForView)

  const buttonForLikes = screen.getByText('like')
  await user.click(buttonForLikes)
  await user.click(buttonForLikes)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
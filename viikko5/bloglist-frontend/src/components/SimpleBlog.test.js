import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'


afterEach(cleanup)
const blog = {
  title: 'Taiteen salaisuus',
  author: 'Konrad Nieminen',
  likes: 6
}

test('clicking like twice cals event handler twice', () => {
  const mockHandler = jest.fn()

  const { getByText } = render (
    <SimpleBlog blog={blog} onClick={mockHandler}/>
  )
  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)

})

test('renders title', () => {


  const component = render(
    <SimpleBlog blog = {blog} />

  )
  expect(component.container).toHaveTextContent(
    'Taiteen salaisuus'
  )
})

test('renders author', () => {


  const component = render(
    <SimpleBlog blog = {blog} />

  )
  expect(component.container).toHaveTextContent(
    'Konrad Nieminen'
  )
})

test('renders likes', () => {


  const component = render(
    <SimpleBlog blog = {blog} />

  )
  expect(component.container).toHaveTextContent(
    'blog has 6 likes'
  )
})
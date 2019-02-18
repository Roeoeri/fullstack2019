const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')




beforeEach(async () =>{
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})



test('blogs are returned as json', async()=> {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async() => {
    const res = await api.get('/api/blogs')

    expect(res.body.length).toBe(helper.initialBlogs.length)
})

test('blog can be added', async () =>{
    const newBlog = 
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
      }

    
      await api 
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()

      const titles = blogsAtEnd.map(b => b.title)

      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length +1)
      expect(titles).toContain(
          'First class tests'
      )
})

test('a blog can be deleted', async() =>{

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)


    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(
        helper.initialBlogs.length -1
    )

    const titles = blogsAtEnd.map(b => b.title)

    expect(titles).not.toContain(blogToDelete.title)


})

afterAll(() => {
    mongoose.connection.close()
})
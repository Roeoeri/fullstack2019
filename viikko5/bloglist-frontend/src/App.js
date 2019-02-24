import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/togglable'
import useField from './hooks/index'


const MaskInput = (args) => {
  const { reset, ...maskedForm } = { ...args }
  return maskedForm
}

const App = () => {


  const username = useField('text')
  const password = useField('password')
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const usernameInput = MaskInput(username)
  const passwordInput = MaskInput(password)
  const titleInput = MaskInput(title)
  const authorInput = MaskInput(author)
  const urlInput = MaskInput(url)





  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  })

  const resetPostForm = () => {
    author.reset()
    title.reset()
    url.reset()
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    blogService.create(blogObject).then(ret => {
      setBlogs(blogs.concat(ret))
      resetPostForm()
    })
  }



  const handleLogin = async (event) => {
    event.preventDefault()
    const arvo1 = username.value
    const arvo2 = password.value

    try{
      const user = await loginService.login({
        username:arvo1, password:arvo2,

      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
    } catch(exception) {
      console.log('väärä tunnus tai salasana')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  if(user === null){
    return (
      <div>
        <h1>Kirjaudu sisään</h1>
        <Togglable buttonLabelYla = "Kirjaudu" buttonLabelAla = "Peru">
          <form onSubmit = {handleLogin}>
          Käyttäjätunnus
            <input {...usernameInput}/>
            <br/>
          Salasana
            <input {...passwordInput}/>
            <br/>
            <button type = "submit">Sisään</button>
          </form>
        </Togglable>

      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick = {handleLogout}>logout</button>
      <form onSubmit = {addBlog}>
        <p></p>
        <div>
        Title
          <input {...titleInput}
          />
        </div>
        <div>
        Author
          <input
            {...authorInput}
          />
        </div>
        <div>
        URL
          <input
            {...urlInput}
          />
        </div>
        <button type = "submit"> lisaa </button>
      </form>
      <p></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}


export default App
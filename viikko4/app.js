const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

mongoose.connect(config.mongourl, { useNewUrlParser: true })
.then(()=>{
    logger.info('connecting to ' , config.mongourl)
    logger.info('connected to', config.mongourl)
})
.catch((error) =>{
    logger.error('error in connection ', error.message)
})

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
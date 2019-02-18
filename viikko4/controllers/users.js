const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')




userRouter.get('/',  async (req, res ) => {
    const users = await User
    .find({}).populate('blogs', {title: 1, author: 1, url: 1, })
    res.json(users.map(u => u.toJSON()))
})


userRouter.post('/', async (request, response, next) =>{
    try {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)


    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })


    const savedUser = await user.save()

    response.json(savedUser)

} catch(exception){
    next(exception)
}
})


module.exports = userRouter


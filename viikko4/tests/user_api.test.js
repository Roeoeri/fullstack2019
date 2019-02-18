const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

describe('when there is single user in db', async()=>{
    beforeEach(async()=>{
        await User.deleteMany({})
        const user = new User({username: 'root', password: 'salasana'})
        await user.save()
    })


    test('creation fails correctly when username is already taken', async() => {
        const usersAtStart = await helper.usersInDb()

        const  newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const res = await api 
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        expect(res.body.error).toContain('`username` to be unique')


        const usersAtEnd = await helper.usersInDb()
        expect(usersAtStart.length).toBe(usersAtStart.length)

    })


    test('can create new user', async() =>{
        const usersAtStart = await helper.usersInDb()

        const newUser = {

            username: 'Jasse8',
            name: 'Jaska Järvinen',
            password: 'salasana'

        }

        await api 
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length +1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })
})


afterAll(() => {
    mongoose.connection.close()
})
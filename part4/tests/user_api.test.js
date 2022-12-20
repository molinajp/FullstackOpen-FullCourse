const bcrypt = require('bcrypt')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}


beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
})


describe('when there is initially one user in db', () => {

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await usersInDb()

        const newUser = {
            username: 'juan-pablo',
            name: 'Juan Pablo Molina',
            password: 'asdf1234',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username must be unique')

        const usersAtEnd = await usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })

    test('creation fails if username is missing', async () => {
        const usersAtStart = await usersInDb()

        const newUser = {
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain(`username can't be blank`)

        const usersAtEnd = await usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })

    test('creation fails if password is missing', async () => {
        const usersAtStart = await usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain(`password can't be blank`)

        const usersAtEnd = await usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })

    test('creation fails if username is shorted than 3 characters', async () => {
        const usersAtStart = await usersInDb()

        const newUser = {
            username: 'as',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain(`username must be at least 3 characters long`)

        const usersAtEnd = await usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })

    test('creation fails if password is shorted than 3 characters', async () => {
        const usersAtStart = await usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'sa',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain(`password must be at least 3 characters long`)

        const usersAtEnd = await usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })
})
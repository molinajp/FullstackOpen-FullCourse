const listHelper = require('../utils/list_helper')

const allBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]
const oneBlog = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    }
]

const sameAmountOfLikes = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    }
]

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('testing totalLikes', () => {

    test('Empty array is zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('All blogs should sum correctly', () => {
        const result = listHelper.totalLikes(allBlogs)
        expect(result).toBe(36)
    })

    test('Array with one blog returns that number of likes', () => {
        const result = listHelper.totalLikes(oneBlog)
        expect(result).toBe(7)
    })
})

describe('testing maxLikes', () => {

    test('Empty array is zero', () => {
        const result = listHelper.maxLikes([])
        expect(result).toEqual({})
    })

    test('max value from allBlogs', () => {
        const result = listHelper.maxLikes(allBlogs)
        expect(result).toEqual(allBlogs[2])
    })

    test('return only blog from array', () => {
        const result = listHelper.maxLikes(oneBlog)
        expect(result).toEqual(oneBlog[0])
    })

    test('return first object when two objects are have same amount of likes', () => {
        const result = listHelper.maxLikes(sameAmountOfLikes)
        expect(result).toEqual(sameAmountOfLikes[0])
    })

})

describe('testing mostBlogs', () => {
    test('Return empty if array is empty', () => {
        const result = listHelper.mostBlogs([])
        expect(result).toEqual({})
    })
    test('Return author with max blogs from all Blogs', () => {
        const result = listHelper.mostBlogs(allBlogs)
        expect(result).toEqual({author: 'Robert C. Martin', blogs: 3})
    })
    test('Return only author', () => {
        const result = listHelper.mostBlogs(sameAmountOfLikes)
        expect(result).toEqual({author: 'Michael Chan', blogs: 2})
    })
})

describe('testing mostLikes', () => {
    test('Return empty if array is empty', () => {
        const result = listHelper.mostLikes([])
        expect(result).toEqual({})
    })
    test('Return author with max likes from all Blogs', () => {
        const result = listHelper.mostLikes(allBlogs)
        expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
    })
    test('Return only author with likes', () => {
        const result = listHelper.mostLikes(sameAmountOfLikes)
        expect(result).toEqual({author: 'Michael Chan', likes: 14})
    })
})
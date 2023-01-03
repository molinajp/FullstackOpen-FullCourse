import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const voteAnecdote = async (anecdote) => {
    const voteAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, voteAnecdote)
    return response.data
}

const exportedObject = {
    getAll,
    createNew,
    voteAnecdote
}

export default exportedObject
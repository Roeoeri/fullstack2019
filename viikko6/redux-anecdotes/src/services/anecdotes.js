import axios from 'axios'

const url = 'http://localhost:3001/anecdotes/'

const getAll = async () => {
    const response = await axios.get(url)
    return response.data
}

const createNew = async content => {
    const response = await axios.post(url, {content, votes: 0})
    return response.data
}

const update = async (id, newObject) => {
    const response = axios.put(url + id, newObject)
    return response.data
}

const getAnecdote = async (id) => {
    const response = await axios.get(url + id)
    return response.data
}

export default {
    getAll,
    createNew,
    update,
    getAnecdote,
}
import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(x => x.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(x => x.id !== id ? x : changedAnecdote)
    },
    setAnecdotes(state, action){
      return action.payload
    }

  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const saveAnecdoteToBack = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(anecdote))
  }
}

export const voteAnecdoteAndSaveToBack = anecdote => {
  return async dispatch => {
    const updateAnecdote = await anecdoteService.voteAnecdote(anecdote)
    dispatch(voteAnecdote(updateAnecdote.id))
  }
}

export const { voteAnecdote, addAnecdote, setAnecdotes } = anecdotesSlice.actions

export default anecdotesSlice.reducer
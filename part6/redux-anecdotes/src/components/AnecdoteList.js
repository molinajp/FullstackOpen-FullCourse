import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdoteAndSaveToBack } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        const anecdotesFiltered = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
        return [...anecdotesFiltered].sort((a, b) => b.votes - a.votes)
    })
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(voteAnecdoteAndSaveToBack(anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5000))
    }

    return <div>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
            </div>
        )}
    </div>
}

export default AnecdoteList
import { connect } from 'react-redux'
import { saveAnecdoteToBack } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({ saveAnecdoteToBack }) => {

    const createAnecdote = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        saveAnecdoteToBack(anecdote)
      }

    return <div>
        <h2>create new</h2>
        <form onSubmit={createAnecdote}>
            <div><input name='anecdote' /></div>
            <button type='submit'>create</button>
        </form>
    </div>
}

const mapDispatchToProps = {
    saveAnecdoteToBack
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm
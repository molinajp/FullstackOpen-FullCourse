import { useState, useEffect } from 'react'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [personsToShow, setPersonsToShow] = useState([...persons])
  const [message, setMessage] = useState(null)
  const [cssClassName, setCssClassName] = useState(null)

  const hookGet = () => {
    personsService
      .getAll()
      .then(persons => {
        setPersons(persons)
        setPersonsToShow(persons)
      })
      .catch(error => console.log('An error has occured'))
  }
  useEffect(hookGet, [])

  const appyfilter = (filterString, array) =>
    filterString !== ''
      ? setPersonsToShow(array.filter(person => person.name.toUpperCase().includes(filterString.toUpperCase())))
      : setPersonsToShow(array)

  const addPerson = (event) => {
    event.preventDefault()
    if (newName === '' || newNumber === '') {
      alert(`Fields can't be blank`);
      return
    }
    let newObject = {
      name: newName,
      number: newNumber,
    }
    const personRepeated = persons.filter(person => person.name.toUpperCase() === newName.toUpperCase())
    if (personRepeated.length !== 0) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const changedPerson = { ...personRepeated[0], number: newNumber }
        personsService
          .updatePerson(changedPerson)
          .then(personUpdated => {
            const personsUpdated = persons.map(person => person.id !== changedPerson.id ? person : personUpdated)
            setPersons(personsUpdated)
            setPersonsToShow(personsUpdated)
            appyfilter(filter, personsUpdated)
            setMessage(`${personUpdated.name} number has been updated`)
            setCssClassName(`successful`)
            setTimeout(() => {
              setMessage(null)
              setCssClassName(null)
            }, 5000)
          })
          .catch(error => {
            setMessage(`${personRepeated[0].name} has already been removed from server`)
            setCssClassName(`error`)
            setTimeout(() => {
              setMessage(null)
              setCssClassName(null)
            }, 5000)
          })
      }
    } else {
      personsService
        .create(newObject)
        .then(newPerson => {
          const copy = persons.concat(newPerson);
          setPersons(copy)
          setPersonsToShow(copy)
          appyfilter(filter, copy)
          setMessage(`Added ${newPerson.name}`)
          setCssClassName(`successful`)
          setTimeout(() => {
            setMessage(null)
            setCssClassName(null)
          }, 5000)
        })
        .catch(error => console.log('An error has occured'))

    }
    setNewName('')
    setNewNumber('')
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
    appyfilter(event.target.value, persons)
  }

  const handleDelete = ({ name, id }) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personsService
        .deletePerson(id)
        .then(response => {
          const resultArray = persons.filter(person => person.id !== id)
          setPersons(resultArray)
          setPersonsToShow(resultArray)
          appyfilter(filter, resultArray)
        })
        .catch(error => console.log('An error has occured'))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} cssClassName={cssClassName}/>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />

    </div>
  )
}

const Filter = ({ filter, handleFilter }) => <div>filter shown with <input value={filter} onChange={handleFilter} /></div>

const PersonForm = ({ addPerson, newName, handleNewName, newNumber, handleNewNumber }) => {
  return <form onSubmit={addPerson}>
    <div>name: <input value={newName} onChange={handleNewName} /></div>
    <div>number: <input value={newNumber} onChange={handleNewNumber} /></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
}

const Persons = ({ personsToShow, handleDelete }) => {
  return personsToShow.map(person =>
    <div key={person.id}>
      {person.name} {person.number}<button onClick={() => handleDelete(person)}>delete</button>
    </div>
  )
}

const Notification = ({ message, cssClassName }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={cssClassName}>
      {message}
    </div>
  )
}

export default App
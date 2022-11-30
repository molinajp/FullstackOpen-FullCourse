import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [personsToShow, setPersonsToShow] = useState([...persons])

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        const persons = response.data
        setPersons(persons)
        setPersonsToShow(persons)
      })
  }
  useEffect(hook, [])

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
      id: persons.length + 1
    }
    const isRepeated = (person) => person.name.toUpperCase() === newName.toUpperCase()
    if (persons.some(isRepeated)) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      const copy = persons.concat(newObject);
      setPersons(copy)
      setPersonsToShow(copy)
      appyfilter(filter, copy)
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />

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

const Persons = ({ personsToShow }) => personsToShow.map(person => <p key={person.id}>{person.name} {person.number}</p>)
export default App
import ReactDOM from 'react-dom/client'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  const [filter, setFilter] = useState('')

  const hookCountries = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        setCountriesToShow(response.data)
      })
  }

  useEffect(hookCountries, [])

  const handleFilter = (event) => {
    setFilter(event.target.value)
    setCountriesToShow(countries.filter(country => country.name.common.toUpperCase().includes(event.target.value.toUpperCase())))
  }

  const showViewHandler = (country) => {
    ReactDOM.createRoot(document.getElementById(country.cca2)).render(<CountryView country={country} />)
  }

  return (
    <div className="App">
      <Filter filter={filter} handleFilter={handleFilter} />
      <DisplayCountries countryArray={countriesToShow} showViewHandler={showViewHandler} />
    </div>
  );
}

const Filter = ({ filter, handleFilter }) => {
  return <div>
    find countries <input value={filter} onChange={handleFilter} />
  </div>
}

const DisplayCountries = ({ countryArray, showViewHandler }) => {
  if (countryArray.length === 0) {
    return <p>No match found</p>
  } else if (countryArray.length === 1) {
    return <CountryView country={countryArray[0]} />
  } else if (countryArray.length > 1 && countryArray.length < 11) {
    return <CountryList countryArray={countryArray} showViewHandler={showViewHandler} />
  } else {
    return <p>Too many matches, specify another filter</p>
  }
}

const CountryList = ({ countryArray, showViewHandler }) => {
  return countryArray.map(country => {
    return <div id={country.cca2} key={country.cca2}>
      {country.name.common} <button onClick={() => showViewHandler(country)}>show</button>
    </div>
  })
}

const CountryView = ({ country }) => {
  const [weather, setWeather] = useState({})
  
  const hookWeather = () => {
    const lat = country.capitalInfo.latlng[0]
    const lon = country.capitalInfo.latlng[1]
    const api_key = process.env.REACT_APP_API_KEY

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
      .then(response => {
        setWeather(response.data)
      })
  }
  useEffect(hookWeather, [country.capitalInfo.latlng])

  return <div>
    <h2>{country.name.common}</h2>
    <p>capital {country.capital}</p>
    <p>area {country.area}</p>
    <h4>languages:</h4>
    <ul>
      {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
    </ul>
    <img src={country.flags.png} alt='flag of country' />
    <Weather data={weather} city={country.capital}/>
  </div>
}

const Weather = ({ data, city }) => {
  if(Object.keys(data).length !== 0){
    const icon = data.weather[0].icon
    const src = `http://openweathermap.org/img/wn/${icon}@2x.png`
    return <div>
    <h3>Weather in {city}</h3>
    <p>temperature {data.main.temp} Celcius</p>
    <img src={src} alt='Weather icon' />
    <p>wind {data.wind.speed} m/s</p>
  </div>
  }
}

export default App;

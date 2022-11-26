import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)


  const textGood = "good"
  const textNeutral = "neutral"
  const textBad = "bad"
  const textAll = "all"
  const textAverage = "average"
  const textPositive = "positive"

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
    setAverage((good + 1 - bad) / (all + 1))
    setPositive(((good + 1) * 100) / (all + 1) + ' %')
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    setAverage((good - bad) / (all + 1))
    setPositive((good * 100) / (all + 1) + ' %')
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setAverage((good - bad - 1) / (all + 1))
    setPositive((good * 100) / (all + 1) + ' %')
  }

  return (
    <div>
      <Title title="give feedback" />
      <Button handleGoodClick={handleGoodClick} textGood={textGood} handleNeutralClick={handleNeutralClick}
        textNeutral={textNeutral} handleBadClick={handleBadClick} textBad={textBad} />
      <Title title="statistics" />
      <Statistics textGood={textGood} good={good} textNeutral={textNeutral} neutral={neutral} textBad={textBad} bad={bad}
        textAll={textAll} all={all} textAverage={textAverage} average={average} textPositive={textPositive} positive={positive} />
    </div>
  )
}

const Title = ({ title }) => <h1>{title}</h1>

const Button = (props) => {
  return <div>
    <button onClick={props.handleGoodClick}>{props.textGood}</button>
    <button onClick={props.handleNeutralClick}>{props.textNeutral}</button>
    <button onClick={props.handleBadClick}>{props.textBad}</button>
  </div>

}


const Statistics = ({ textGood, good, textNeutral, neutral, textBad, bad, textAll, all, textAverage, average, textPositive, positive }) => {
  if (all === 0) {
    return <p>No feedback given</p>
  }
  return <table>
    <tbody>
    <StatisticLine text={textGood} value={good} />
    <StatisticLine text={textNeutral} value={neutral} />
    <StatisticLine text={textBad} value={bad} />
    <StatisticLine text={textAll} value={all} />
    <StatisticLine text={textAverage} value={average} />
    <StatisticLine text={textPositive} value={positive} />
    </tbody>
  </table>
}

const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

export default App
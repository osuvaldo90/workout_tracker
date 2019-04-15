import React from 'react'
import ReactDOM from 'react-dom'

import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {NewDay} from './new-day'
import './index.css'

function DayTable (props) {
  const exerciseRows = props.exercises.map((exercise, index) => 
    <tr key={index}>
      <td>{exercise}</td>
    </tr>
  )
  return (
    <Table bordered>
      <thead>
        <tr>
          <th>{props.name}</th>
        </tr>
      </thead>
      <tbody>
        {exerciseRows}
      </tbody>
    </Table>
  )
}

function Routine (props) {
  const legDayExercises = ['Squats', 'Leg Extensions']
  const pushDayExercises = ['Bench Press', 'Overhead Press']

  return (
    <React.Fragment>
      <DayTable
        name="Leg Day"
        exercises={legDayExercises}
      />
      <DayTable
        name="Push Day"
        exercises={pushDayExercises}
      />
      <Link to="/new-day">
        <Button block>Add New Day</Button>
      </Link>
    </React.Fragment>
  )
}


class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      page: 'routine'
    }
  }


  render () {
    return (
      <main>
        <Router>
          <Route exact path="/" component={Routine} />
          <Route path="/new-day" component={NewDay}/>
        </Router>
      </main>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

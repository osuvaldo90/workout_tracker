import React from 'react'
import ReactDOM from 'react-dom'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { NewDay } from './new-day'
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
      <Row>
        <Col>
          <h1>Routine</h1>
        </Col>
      </Row>
      
      <Row>
        <Col>
          <DayTable
            name="Leg Day"
            exercises={legDayExercises}
          />
        </Col>
      </Row>
      
      <Row>
        <Col>
          <DayTable
            name="Push Day"
            exercises={pushDayExercises}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <Link to="/new-day">
            <Button block>Add New Day</Button>
          </Link>
        </Col>
      </Row>
    </React.Fragment>
  )
}

function App () {
  return (
    <main>
      <Container className="mainContainer">
        <Col md="6">
          <Router>
            <Route exact path="/" component={Routine} />
            <Route path="/new-day" component={NewDay}/>
          </Router>
        </Col>
      </Container>
    </main>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

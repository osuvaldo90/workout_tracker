import React, { useEffect, useState } from 'react'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'

import { Link } from "react-router-dom"

import { getRoutine } from './data'

export function Routine (props) {
  const [routine, updateRoutine] = useState([])
  useEffect(() => {
    getAndUpdateRoutine()

    return () => {

    }

    async function getAndUpdateRoutine () {
      const routine = await getRoutine()
      updateRoutine(routine)
    }
  }, [])

  return (
    <React.Fragment>
      <Row>
        <Col>
          <h1>Routine</h1>
        </Col>
      </Row>

      {routine.map((day, index) =>
        <Row key={index}>
          <Col>
            <DayTable name={day.name} exercises={day.exercises.map(e => e.name) }/>
          </Col>
        </Row>
      )}

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

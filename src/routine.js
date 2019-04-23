import React, { useEffect, useState } from 'react'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'

import { FaTrash } from 'react-icons/fa'

import { Link } from "react-router-dom"

import { getRoutine, deleteDay } from './data'
import './routine.css'

export function Routine (props) {
  const [routine, updateRoutine] = useState([])
  useEffect(() => {
    getAndUpdateRoutine()

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
        <Row key={day.id}>
          <Col>
            <DayTable
              name={day.name}
              exercises={day.exercises.map(e => e.name)}
              deleteDay={async () => {
                await deleteDay(day.id)
                const newRoutine = await getRoutine()
                updateRoutine(newRoutine)
              }}
            />
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
  return (
    <Card className="day">
      <Card.Header>
          <Row>
             <Col><h4>{props.name}</h4></Col>
             <Col xs="2">
               <Button variant="danger" onClick={props.deleteDay}><FaTrash /></Button>
             </Col>
          </Row>
      </Card.Header>
      <ListGroup>
        {props.exercises.map((e, i) => <ListGroup.Item key={i}>{e}</ListGroup.Item>)}
      </ListGroup>
    </Card>
  )
}

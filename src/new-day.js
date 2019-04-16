import React, { createRef, useState } from 'react'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'

import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa'

import { Link, Redirect } from 'react-router-dom'

export function NewDay (props) {
  const [exercises, updateExercises] = useState([])
  const [saved, updateSaved] = useState(false)

  const nameInputRef = createRef()

  function addExercise () {
    const newExercises = exercises.slice()
    newExercises.push({
      name: null,
      sets: []
    })
    updateExercises(newExercises)
  }

  function saveDay (event) {
    event.preventDefault()

    const storedDays = localStorage.getItem('days')
    const days = storedDays ? JSON.parse(storedDays) : []
    const name = nameInputRef.current.value

    days.push({ name, exercises })
    localStorage.setItem('days', JSON.stringify(days, null, 2))

    updateSaved(true)
  }

  function updateExercise (index, exercise) {
    const newExercises = exercises.slice()
    newExercises[index] = exercise
    updateExercises(newExercises)
  }

  return (
    <React.Fragment>
      <Form onSubmit={saveDay}>
        <Row>
          <Form.Group as={Col}>
            <Form.Control
              ref={nameInputRef}
              size="lg"
              name="name"
              type="text"
              placeholder="New Day"
              required
            />
          </Form.Group>
        </Row>

        {exercises.map((e, i) => {
          return (
            <Exercise
            key={i}
              name={e.name}
              sets={e.sets}
              updateExercise={updateExercise.bind(null, i)}
              />
          )
        })}

        <Row>
          <Form.Group as={Col}>
            <Button block variant="outline-primary" onClick={addExercise}>Add Exercise</Button>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col}>
            <Button block type="submit">Save</Button>
          </Form.Group>
          <Col>
            <Link to="/">
              <Button block variant="outline-danger">Cancel</Button>
            </Link>
          </Col>
        </Row>
      </Form>

      {saved && <Redirect to='/' />}
    </React.Fragment>
  )
}

function Exercise (props) {
  const repsInputRef = createRef()
  const weightInputRef = createRef()

  function addSet () {
    const reps = parseInt(repsInputRef.current && repsInputRef.current.value)
    const weight = parseInt(weightInputRef.current && weightInputRef.current.value)

    if (isNaN(reps) || isNaN(weight)) return

    const newSets = props.sets.slice()
    newSets.push({ reps, weight })

    props.updateExercise({
      name: props.name,
      sets: newSets
    })
  }

  function updateName (event) {
    props.updateExercise({
      name: event.target.value,
      sets: props.sets
    })
  }

  return (
    <React.Fragment>
      <Row>
        <Form.Group as={Col}>
          <Form.Control 
            type="text"
            placeholder="Exercise"
            defaultValue={props.name}
            onChange={updateName}
            required
          />
        </Form.Group>
        <Col xs="2">
        <Form.Group>
          <Button variant="danger"><FaTrash /></Button></Form.Group>
        </Col>
      </Row>

      {props.sets.map((set, index) =>
        <Row key={index}>
          <Set reps={set.reps} weight={set.weight} />
        </Row>
      )}

      <Row>
        <Form.Group as={Col}>
          <InputGroup xs="5">
            <Form.Control ref={repsInputRef} className="setInput" type="number" step="1" />
            <InputGroup.Append>
              <InputGroup.Text>reps</InputGroup.Text>
            </InputGroup.Append>
        </InputGroup>
        </Form.Group>

        <Form.Group as={Col}>
          <InputGroup xs="5">
            <Form.Control ref={weightInputRef} className="setInput" type="number" step="5" />
            <InputGroup.Append>
              <InputGroup.Text>lbs</InputGroup.Text>
            </InputGroup.Append>
        </InputGroup>
        </Form.Group>

        <Col xs="2">
          <Button className="addSetButton" variant="outline-primary" onClick={addSet}><FaPlus /></Button>
        </Col>
      </Row>
    </React.Fragment>
  )
}

function Set (props) {
  return (
    <React.Fragment>
      <Form.Group as={Col}>
        <InputGroup xs="5">
          <Form.Control className="setInput" type="number" defaultValue={props.reps} readOnly />
          <InputGroup.Append>
              <InputGroup.Text>reps</InputGroup.Text>
            </InputGroup.Append>
        </InputGroup>
      </Form.Group>
    
      <Form.Group as={Col}>
        <InputGroup xs="5">
          <Form.Control className="setInput" type="number" defaultValue={props.weight} readOnly />
          <InputGroup.Append>
              <InputGroup.Text>lbs</InputGroup.Text>
            </InputGroup.Append>
        </InputGroup>
      </Form.Group>

      <Col xs="2">
        <Button><FaMinus /></Button>
      </Col>
    </React.Fragment>
  )
}


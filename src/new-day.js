import React, { createRef, useState } from 'react'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'

import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa'

export function NewDay (props) {
  const [exercises, updateExercises] = useState([])

  function addExercise () {
    const newExercises = exercises.slice()
    newExercises.push({})
    updateExercises(newExercises)
  }

  return (
    <React.Fragment>
      <Row>
        <Col>
          <h1>New Day</h1>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group>
            <Form.Control type="text" placeholder="Day" required />
          </Form.Group>
        </Col>
      </Row>

      {exercises.map((e, i) =>
        <Exercise key={i} name={e.name} />
      )}

      <Row>
        <Col>
          <Form.Group>
            <Button block variant="outline-primary" onClick={addExercise}>Add Exercise</Button>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group>
            <Button block>Save</Button>
          </Form.Group>
        </Col>
        <Col>
          <Button block variant="outline-danger">Cancel</Button>
        </Col>
      </Row>
    </React.Fragment>
  )
}

function Exercise (props) {
  const [sets, updateSets] = useState([{ reps: 5, weight: 155 }])

  const repsRef = createRef()
  const weightRef = createRef()

  function addSet () {
    console.log(repsRef, weightRef)
    const reps = parseInt(repsRef.current && repsRef.current.value)
    const weight = parseInt(weightRef.current && weightRef.current.value)
  
    if (isNaN(reps) || isNaN(weight)) return
  
    const newSets = sets.slice()
    newSets.push({ reps, weight })
  
    updateSets(newSets)
  }
  

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Form.Group>
            <Form.Control type="text" placeholder="Exercise" defaultValue={props.name} />
          </Form.Group>
        </Col>
        <Col xs="2">
        <Form.Group>
          <Button variant="danger"><FaTrash /></Button></Form.Group>
        </Col>
      </Row>

      {sets.map((set, index) =>
        <Row key={index}>
          <Set reps={set.reps} weight={set.weight} />
        </Row>
      )}

      <Row>
        <Form.Group as={Col}>
          <InputGroup xs="5">
            <Form.Control ref={repsRef} className="setInput" type="number" step="1" />
            <InputGroup.Append>
              <InputGroup.Text>reps</InputGroup.Text>
            </InputGroup.Append>
        </InputGroup>
        </Form.Group>

        <Form.Group as={Col}>
          <InputGroup xs="5">
            <Form.Control ref={weightRef} className="setInput" type="number" step="5" />
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
        <Button><FaEdit /></Button>
      </Col>
    </React.Fragment>
  )
}


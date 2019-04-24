import React, { createRef } from 'react'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'

import { FaMinus, FaPlus, FaTimes } from 'react-icons/fa'

import {generate as shortid} from 'shortid'

export function Exercise (props) {
  const repsInputRef = createRef()
  const weightInputRef = createRef()

  function addSet () {
    const reps = parseInt(repsInputRef.current && repsInputRef.current.value)
    const weight = parseInt(weightInputRef.current && weightInputRef.current.value)

    if (isNaN(reps) || isNaN(weight)) return

    const newSets = props.sets.slice()
    newSets.push({ id: shortid(), reps, weight })

    props.updateExercise({
      ...props,
      sets: newSets
    })
  }

  function deleteSet (index) {
    const newSets = props.sets.slice()
    newSets.splice(index, 1)

    console.log('deleteSet', index, JSON.stringify(props.sets, null, 2), JSON.stringify(newSets, null, 2))

    props.updateExercise({
      ...props,
      sets: newSets
    })
  }

  function updateName (event) {
    props.updateExercise({
      ...props,
      name: event.target.value
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
          <Button variant="danger" onClick={props.deleteExercise}><FaTimes /></Button></Form.Group>
        </Col>
      </Row>

      {props.sets.map((set, index) =>
        <Row key={set.id}>
          <Set
            reps={set.reps}
            weight={set.weight}
            deleteSet={deleteSet.bind(null, index)}
          />
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
        <Button onClick={props.deleteSet}><FaMinus /></Button>
      </Col>
    </React.Fragment>
  )
}


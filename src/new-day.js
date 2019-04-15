import React, { useState } from 'react'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'

import { FaEdit, FaMinus, FaPlus, FaTimes } from 'react-icons/fa'

export function NewDay (props) {
  const [exercises, updateExercises] = useState([])

  return (
    <Form>
      <Table bordered>
        <thead>
          <tr>
            <th>New Day</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Form.Group>
                <Form.Control type="text" placeholder="Day" required />
              </Form.Group>
            </td>
          </tr>

          {exercises.map((exercise, index) => 
            <tr key={index}>
              <td>{exercise}</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Button block variant="outline-primary" onClick={() => updateExercises(addExercise(exercises))}>Add Exercise</Button>
      <Button block variant="outline-danger">Cancel</Button>
      <Button block>Save</Button>
    </Form>
  )
}

function Exercise (props) {
  const [sets, updateSets] = useState([])

  return (
    <React.Fragment>
      <Table>
        <tbody>
          <tr>
            <td>
              <Form.Group>
                <Form.Control type="text" placeholder="Exercise" />
              </Form.Group>
            </td>
          </tr>

          {sets.map((set, index) =>
            <tr key={index}>
              <td>
                <Form.Row>{set}</Form.Row>
              </td>
            </tr>
          )}

          <tr>
            <td>
              <Form.Row>
                <Form.Group as={Col} xs="3" className="setCol">
                  <Form.Control id="repsInput" className="setInput" type="number" step="1" placeholder="Reps" />
                </Form.Group>

                <Col xs="2">
                  <Button block variant="outline-primary" disabled><FaTimes /></Button>
                </Col>

                <Form.Group as={Col} xs="3" className="setCol">
                  <Form.Control id="weightInput" className="setInput" type="number" step="5" placeholder="Weight" />
                </Form.Group>

                <Col xs="2">
                  <Button onClick={() => updateSets(addSet(sets))}><FaPlus /></Button>
                </Col>
              </Form.Row>
            </td>
          </tr>
        </tbody>
      </Table>
    </React.Fragment>
  )
}

function addExercise (exercises) {
  const newExercises = exercises.slice()
  newExercises.push(<Exercise key={newExercises.length} />)
  return newExercises
}

function addSet (sets) {
  const repsInput = document.getElementById('repsInput')
  const weightInput = document.getElementById('weightInput')

  const reps = parseInt(repsInput.value)
  const weight = parseInt(weightInput.value)

  if (isNaN(reps) || isNaN(weight)) return

  const newSets = sets.slice()
  newSets.push(
    <React.Fragment>
      <Form.Group as={Col} xs="3">
        <Form.Control className="setInput" type="number" value={reps} readOnly plaintext />
      </Form.Group>

      <Col xs="2">
        <Button block variant="outline-primary" disabled><FaTimes /></Button>
      </Col>

      <Form.Group as={Col} xs="3">
        <Form.Control className="setInput" type="number" value={weight} readOnly plaintext/>
      </Form.Group>

      <Col xs="2">
        <Button><FaEdit /></Button>
      </Col>

      <Col xs="2">
        <Button><FaMinus /></Button>
      </Col>
    </React.Fragment>
  )

  return newSets
}
